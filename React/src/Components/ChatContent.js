import React from 'react'

const ChatContent = ({tab, userData, publicChats, privateChats}) => {
  
    return (

    <div className="chat-content ">
      <ul className="chat-messages ml-1 mt-2 space-y-2 grid grid-cols-1 min-w-[80rem]">
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
    </div>
  );
};

export default ChatContent