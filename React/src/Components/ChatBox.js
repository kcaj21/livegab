import React, {useEffect} from 'react'
import MemberList from "./MemberList";
import ChatContent from "./ChatContent";

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
      <div className="SideBar flex-col-1 h-screen w-full max-w-[18rem] bg-gray-600 text-white shadow-lg text-center">
        <MemberList tab={tab} privateChats={privateChats} setTab={setTab} />
        </div>
        <div className="ChatContent flex-col-2">
        <ChatContent tab={tab} userData={userData} publicChats={publicChats} privateChats={privateChats} 
        handleValue={handleValue} sendPublicMessage={sendPublicMessage} sendPrivateMessage={sendPrivateMessage}/>
      </div>
</div>
  )
}

export default ChatBox