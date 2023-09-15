import React from 'react'
import "./ChatContent.css"

const ChatContent = ({tab, userData, publicChats, privateChats, handleValue, sendPublicMessage, sendPrivateMessage}) => {
  
    return (

    <div className="chat-content">
      <ul className="chat-messages">
        {tab === "CHATROOM"
          ? publicChats.map((chat, index) => (
            <li className="message" key={index}>
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar-self">{chat.senderName}</div>
                    )}
                  </li>
            ))
          : privateChats.get(tab).map((chat, index) => (
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
          placeholder={
            tab === "CHATROOM"
              ? "Type a public message..."
              : `Type a private message to ${tab}`
          }
          value={userData.message}
          onChange={handleValue}
        />
        <button
          type="button"
          className="send-button"
          onClick={
            tab === "CHATROOM" ? sendPublicMessage : sendPrivateMessage
          }
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContent