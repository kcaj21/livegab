import React from 'react'
import MemberList from "../Components/MemberList";
import ChatContent from "../Components/ChatContent";

const ChatBox = ({
    tab,
    userData,
    publicChats,
    privateChats,
    handleValue,
    sendPublicMessage,
    sendPrivateMessage,
    setTab,
  }) => {
  return (
    <div className="Chatbox flex">
      <div className="SideBar h-screen w-full max-w-[18rem] bg-gray-600 text-white shadow-lg text-center">
        <MemberList tab={tab} privateChats={privateChats} setTab={setTab} />
        </div>
        <div className="ChatContent">
        <ChatContent tab={tab} userData={userData} publicChats={publicChats} privateChats={privateChats} 
        handleValue={handleValue} sendPublicMessage={sendPublicMessage} sendPrivateMessage={sendPrivateMessage}/>
      </div>
</div>
  )
}

export default ChatBox