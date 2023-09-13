import React, {useState} from 'react'
import {over} from 'stompjs'
import SockJS from 'sockjs-client'

var stompClient = null

const ChatRoom = () => {

    const [publicChats, setPublicChats] = useState ([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [userData, setUserData] = useState ({
        username: "",
        receivername: "",
        connected: false,
        message: ""
    });

    const handleUserName = (e) => {
        setUserData[{...userData, "username": e.target.value}]
    };

    const registerUser = () => {
      let Sock = new SockJS ("http://localhost:8080/ws");
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
      setUserData({...userData, "connected": true});
      stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
      stompClient.subscribe("/user/" + userData.username + "/private", onPrivateMessage);
    }

    const onPublicMessageReceived = (payload) => {
      let payLoadData = JSON.parse(payload.body);
      switch(payLoadData.status){
        case "JOIN":
            if (privateChats.get(payLoadData.senderName)){
                privateChats.set(payLoadData.senderName, [])
            setPrivateChats(new Map(privateChats));
            }
            break;
        case "MESSAGE":
            publicChats.push(payLoadData);
            setPublicChats([...publicChats])
            break;
      }
    }

    const onPrivateMessageReceived = (payload) => {
        let payLoadData = JSON.parse(payload)
        if (privateChats.get(payLoadData.senderName)){
            privateChats.get(payLoadData.senderName).push(payLoadData);
            setPrivateChats(new Map(privateChats));
        }
        else {
            let list = [];
            list.push(payLoadData);
            privateChats.set(payLoadData.senderName, list)
            setPrivateChats(new Map(privateChats));

        }
      
    }

    const onError = (err) => {
        console.log(err)
    }

  return (
    <div className="chatroom-container">
        {userData.connected?
        <div>
        </div>
        :
        <div className="register">
        <input
        id="user-name"
        placeholder="Enter your user name"
        value={userData.username}
        onChange={handleUserName}
        />
        <button type="button" onClick={registerUser}>connected</button>
        </div>}
    </div>
  )
}

export default ChatRoom