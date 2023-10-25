import React from 'react'

const ChatContent = ({tab, userData, publicChats, privateChats}) => {
  
    return (

    <div className="chat-content">
      <ul className="chat-messages mt-2 mr-3 ml-1 mb-2 space-y-2 grid grid-cols-1 text-xl">
        {tab === "CHATROOM"
          ? publicChats.map((chat, index) => (
            <li
                className={`chat-bubble max-w-[90%] break-all bg-[#282b30] text-[#ffffffb9] ${
                  chat.senderName !== userData.username ? "place-self-start ml-4" : "place-self-end bg-[#7289da] mr-4"
                }`}
                key={index}
              >
                    <div>{chat.message}</div>
                    {chat.senderName !== userData.username && (
                      <div>{chat.senderName}</div>
                    )}
                    {chat.senderName === userData.username && (
                      <div>You</div>
                    )}
                  </li>
            ))
          : privateChats.get(tab).map((chat, index) => (
            <li className={`chat-bubble max-w-[90%] break-all  bg-[#282b30] text-[#ffffffb9] ${
                  chat.senderName !== userData.username ? "place-self-start ml-4" : "place-self-end bg-[#7289da] mr-4"
                }`} key={index}>
                    <div>{chat.message}</div>
                    {chat.senderName !== userData.username && (
                      <div>{chat.senderName}</div>
                    )}
                    {chat.senderName === userData.username && (
                      <div>You</div>
                    )}
                  </li>
            ))}
      </ul>

    </div>
  );
};

export default ChatContent