import React, { useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import Register from "../Components/Register";
import ChatBox from "../Components/ChatBox";

let stompClient = null;

const ChatRoomContainer = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoadingChatHistory, setIsLoadingChatHistory] = useState(true);
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
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // const EC2 = process.env.IP

  const registerUser = () => {
    // console.log({EC2})
    if (userData.username.length > 0) {
      setIsConnected(true)
      console.log("Connecting to server...");
      let Sock = new SockJS(`http://34.172.182.174:8080/ws`);
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
    } else {
      alert("please enter a username");
    }
  };

  const onConnected = () => {
    const controller = new AbortController()

    setTimeout(() => {
      controller.abort()
    }, 8000)
    fetch(`http://34.172.182.174:8080/allMessages`, {signal: controller.signal})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setIsLoadingChatHistory(false);
        setPublicChats(data)
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingChatHistory(false)
        alert('Chat history unavailable');
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
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onPublicMessageReceived = (payload) => {
    let payLoadData = JSON.parse(payload.body);
    console.log("Received public message:", payLoadData);
    switch (payLoadData.status) {
      case "JOIN":
        if (!privateChats.get(payLoadData.senderName)) {
          privateChats.set(payLoadData.senderName, []);
          setPrivateChats(new Map(privateChats));
          sendUserNames();
        }
        break;
      case "MESSAGE":
        console.log("Received MESSAGE:", payLoadData.message);
        publicChats.push(payLoadData);
        setPublicChats([...publicChats]);
        break;
      default:
      //do nothing
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
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        status: "JOIN",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }
  };

  const sendPublicMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };
      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <div className="chatbox-container bg-primary">
      {userData.connected ? (
        <ChatBox
          isLoadingChatHistory={isLoadingChatHistory}
          tab={tab}
          userData={userData}
          publicChats={publicChats}
          privateChats={privateChats}
          handleValue={handleValue}
          sendPublicMessage={sendPublicMessage}
          sendPrivateMessage={sendPrivateMessage}
          setTab={setTab}
          onConnected={onConnected}
        />
      ) : (
        <div className="flex flex-col justify-center h-screen">
            <Register
            isConnected={isConnected}
            userData={userData}
            handleValue={handleValue}
            registerUser={registerUser}
          />
        </div>
      )}
    </div>
  );
};

export default ChatRoomContainer;
