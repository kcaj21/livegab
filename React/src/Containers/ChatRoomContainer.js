import React, { useEffect, useState } from "react";
import { Stomp, over } from "stompjs";
import SockJS from "sockjs-client";
import Register from "../Components/Register";
import ChatBox from "../Components/ChatBox";

var stompClient = null;

const ChatRoomContainer = () => {
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    receiverName: "",
    connected: false,
    message: "",
  });

  const handleValue = (e) => {
    const {value, name} = e.target;
    setUserData({ ...userData, [name]:value });
  };

  const registerUser = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    fetch("http://localhost:8080/allMessages/")
    .then(response => {
      return response.json()
    })
    .then(data => {
    console.log(data);
    data.forEach(message => {
      if (message.message != null){
        publicChats.push(message);
        setPublicChats([...publicChats]);
      }
    });
    })
    .catch(error => {
      console.error(error);
      // alert('everything is broken.');
    });
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessageReceived
    );
    userJoin();
  };

  const userJoin = () => {
            let chatMessage = {
                senderName: userData.username,
                status: "JOIN"
            };
            stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
        }

        const onPublicMessageReceived = (payload) => {
          let payLoadData = JSON.parse(payload.body);
          console.log("Received public message:", payLoadData);
          switch (payLoadData.status) {
            case "JOIN":
              if (!privateChats.get(payLoadData.senderName)) {
                privateChats.set(payLoadData.senderName, []);
                setPrivateChats(new Map(privateChats));
                sendUserNames()
              }
              break;
            case "MESSAGE":
              console.log("Received MESSAGE:", payLoadData.message);
              publicChats.push(payLoadData);
              setPublicChats([...publicChats]);
              break;
          }
        };
        
  const onPrivateMessageReceived = (payload) => {
    let payLoadData = JSON.parse(payload.body);
    if (privateChats.get(payLoadData.senderName)) {
      privateChats.get(payLoadData.senderName).push(payLoadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payLoadData);
      privateChats.set(payLoadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const sendUserNames = () => {
    // this is called after onPublicMessageReceived so all users will send their userNames out when a new user joins so that the new user can append them to their membersList in their prvateChats state
    if(stompClient) {
      let chatMessage = {
          senderName: userData.username,
          status: "JOIN"
      };
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
  }}

  const sendPublicMessage = () => {
    if(stompClient) {
        let chatMessage = {
            senderName: userData.username,
            message: userData.message,
            status: "MESSAGE"
        };
        stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
        setUserData({...userData, "message": ""})
        console.log(userData.message)
    }
  }

  const sendPrivateMessage = () => {
    if(stompClient) {
        let chatMessage = {
            senderName: userData.username,
            receiverName: tab,
            message: userData.message,
            status: "MESSAGE"
        };
        if(userData.username !==tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
        }
        stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
        setUserData({...userData, "message": ""})
    }
  }

  const onError = (err) => {
    console.log(err);
  };

  return (
    <div className="chatroom-container bg-primary">
      {userData.connected ? (
      <ChatBox tab={tab} userData={userData} publicChats={publicChats} privateChats={privateChats}
      handleValue={handleValue} sendPublicMessage={sendPublicMessage} sendPrivateMessage={sendPrivateMessage} setTab={setTab}/>
      ) : (
      <Register userData={userData} handleValue={handleValue} registerUser={registerUser}/>
      )}
    </div>
  )
}

export default ChatRoomContainer;