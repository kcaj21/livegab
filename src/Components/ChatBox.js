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
    <div className="chat-box">
    <MemberList tab={tab} privateChats={privateChats} setTab={setTab} />
    <ChatContent tab={tab} userData={userData} publicChats={publicChats} privateChats={privateChats} 
    handleValue={handleValue} sendPublicMessage={sendPublicMessage} sendPrivateMessage={sendPrivateMessage}/>
</div>
  )
}

export default ChatBox