import React, { useEffect, useRef } from 'react';
import MemberList from './MemberList';
import ChatContent from './ChatContent';
import MessageInput from './MessageInput';

const ChatBox = ({
  tab,
  userData,
  publicChats,
  privateChats,
  handleValue,
  sendPublicMessage,
  sendPrivateMessage,
  setTab,
  onConnected
}) => {
  const chatContentRef = useRef(null);

  const autoScroll = () => {
    
    if (
    chatContentRef.current && chatContentRef.current.scrollTop >= (chatContentRef.current.scrollHeight - (window.screen.height*0.92))
    ) {
    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight}
  }

  const initialScroll = () => {
    if (
      chatContentRef.current.scrollTop  <= 10
      ) 
      {chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight}
  }

  useEffect(() => {
    initialScroll()
  })

  
  useEffect(() => {

    autoScroll()
  }, [publicChats, privateChats]);

  return (
    <div className="Chatbox h-screen flex flex-col-1">
      <div className="SideBar w-full max-w-[20%] bg-[#282b30] border-[#ffffff29] text-white shadow-lg">
        <MemberList tab={tab} privateChats={privateChats} setTab={setTab} userData={userData} />
      </div>
      <div className='h-[90%] overflow-y-auto' ref={chatContentRef}>
        <ChatContent 
          tab={tab}
          userData={userData}
          publicChats={publicChats}
          privateChats={privateChats}
          handleValue={handleValue}
          sendPublicMessage={sendPublicMessage}
          sendPrivateMessage={sendPrivateMessage}
        />
      </div>
      <div className="messageSender mb-4 mx-auto pr-4 h-[8%] w-[79%] fixed bottom-0 right-0">
        <MessageInput
          tab={tab}
          userData={userData}
          publicChats={publicChats}
          privateChats={privateChats}
          handleValue={handleValue}
          sendPublicMessage={sendPublicMessage}
          sendPrivateMessage={sendPrivateMessage}
        />
      </div>
    </div>
  );
};

export default ChatBox;