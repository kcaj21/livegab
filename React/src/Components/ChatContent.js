import React from 'react'
import MessageInput from './MessageInput';

const ChatContent = ({tab, userData, publicChats, privateChats, sendPublicMessage, handleValue, sendPrivateMessage}) => {
  
    return (

    <div className="chat-content">
      <ul className="chat-messages ml-1 mt-2 space-y-2 grid grid-cols-1 max-w-screen text-xl">
        {tab === "CHATROOM"
          ? publicChats.map((chat, index) => (
            <li
                className={`chat-bubble  bg-yellow-200 text-gray-700 ${
                  chat.senderName !== userData.username ? "place-self-start" : "place-self-end"
                }`}
                key={index}
              >
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    {chat.senderName === userData.username && (
                      <div className="avatar-self">You</div>
                    )}
                  </li>
            ))
          : privateChats.get(tab).map((chat, index) => (
            <li className={`chat-bubble  bg-yellow-200 text-gray-700 ${
                  chat.senderName !== userData.username ? "place-self-start" : "place-self-end"
                }`} key={index}>
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

    </div>
  );
};

export default ChatContent