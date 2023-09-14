import React, { useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

var stompClient = null;

const ChatRoom = () => {
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });

  const handleValue = (e) => {
    const {value, name} = e.target;
    setUserData({ ...userData, [name]:value });
  };

//   const handleMessage = (e) => {
//     setUserData[{ ...userData, message: e.target.value }];
//   };

  const registerUser = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
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
          console.log("Received public message:", payLoadData); // Add this line for debugging
          switch (payLoadData.status) {
            case "JOIN":
              if (!privateChats.get(payLoadData.senderName)) {
                privateChats.set(payLoadData.senderName, []);
                setPrivateChats(new Map(privateChats));
              }
              break;
            case "MESSAGE":
              console.log("Received MESSAGE:", payLoadData.message); // Add this line for debugging
              publicChats.push(payLoadData);
              setPublicChats([...publicChats]);
              break;
          }
        };
        

  const onPrivateMessageReceived = (payload) => {
    let payLoadData = JSON.parse(payload);
    if (!privateChats.get(payLoadData.senderName)) {
      privateChats.set(payLoadData.senderName).push(payLoadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payLoadData);
      privateChats.set(payLoadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

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
            receivername: tab,
            message: userData.message,
            status: "MESSAGE"
        };
        if(userData.username !==tab){
            privateChats.set(tab).push(chatMessage);
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
    <div className="chatroom-container">
      {userData.connected ? (
        <div className="chat-box">
        <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
          {tab === "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li className="message" key={index}>
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar-self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="send-message">
                <input
                  type="text"
                  name="message"
                  className="input-message"
                  placeholder="Type a public message..."
                  value={userData.message}
                  onChange={handleValue}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendPublicMessage}
                >
                  Send
                </button>
              </div>
            </div>
          )}
          {tab !== "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {[...privateChats.get(tab)].map((chat, index) => (
                  <li className="message" key={index}>
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar-self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="send-message">
                <input
                  name="message"
                  type="text"
                  className="input-message"
                  placeholder={`Type a private message to ${tab}`}
                  value={userData.message}
                  onChange={handleValue}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendPrivateMessage}
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="register">
          <input
            name="username"
            id="user-name"
            placeholder="Enter your user name"
            value={userData.username}
            onChange={handleValue}
          />
          <button type="button" onClick={registerUser}>
            connected
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;