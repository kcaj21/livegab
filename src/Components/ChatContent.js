import React from 'react'

const ChatContent = ({tab, userData, publicChats, privateChats, handleValue, sendPublicMessage, sendPrivateMessage}) => {
  
    return (

    <div className="chat-content h-screen text-white">
      <ul className="chat-messages">
        {tab === "CHATROOM"
          ? publicChats.map((chat, index) => (
            <li className="chat-bubble max-w-[80rem] mt-1.5 mb-.5 mr-2.5 ml-2.5 bg-yellow-200 text-gray-700" key={index}>
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
            <li className="chat-bubble max-w-[80rem] mt-1.5 mb-.5 mr-2.5 ml-2.5 bg-yellow-200 text-gray-700" key={index}>
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
      <div className="send-message fixed bottom-0">
        <input className="text-box"
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