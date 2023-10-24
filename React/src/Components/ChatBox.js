import React, { useEffect, useRef, useState } from 'react';
import MemberList from './MemberList';
import MobileMemberList from './MobileMemberList';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const autoScroll = () => {
    if (
      chatContentRef.current &&
      chatContentRef.current.scrollTop >=
        chatContentRef.current.scrollHeight - window.screen.height * 0.92
    ) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  const initialScroll = () => {
    if (chatContentRef.current.scrollTop === 0) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    console.log(document.documentElement.scrollTop)
    initialScroll();
  }, );

  useEffect(() => {
    autoScroll();
  }, [publicChats, privateChats]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    
    <div className=''>
      <div className=''>
      <svg
  onClick={handleSidebarToggle}
  className="fixed top-0 h-9 w-9 z-20 sm:hidden block border border-[#424549] rounded-md ml-1 mt-4"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#8398e6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    
    d={` ${!sidebarOpen ? 'M4 6h16M4 12h16m-7 6h7' : 'M6 18L18 6M6 6l12 12'}`}
  />
</svg>
      </div>
      {!sidebarOpen ? null : (
        <div className='mobile-sidebar fixed border-r-2 border-[#27292c] left-0 z-10 h-screen bg-[#282b30] w-[60%]'>
          <MobileMemberList tab={tab} privateChats={privateChats} setTab={setTab} userData={userData} handleSidebarToggle={handleSidebarToggle} />
        </div>
      )}

      <div className='Chatbox h-screen flex flex-col-1'>
        <div className='Desktop-sideBar border-r-2 border-[#27292c] w-full max-w-[20%] bg-[#282b30] hidden sm:block border-[#ffffff29] text-white shadow-lg'>
          <MemberList tab={tab} privateChats={privateChats} setTab={setTab} userData={userData}/>
        </div>
        <div className='h-[90%] sm:ml-0 ml-8 w-screen overflow-y-auto' ref={chatContentRef}>
          <ChatContent
            tab={tab}
            userData={userData}
            publicChats={publicChats}
            privateChats={privateChats}
            handleValue={handleValue}
            sendPublicMessage={sendPublicMessage}
            sendPrivateMessage={sendPrivateMessage}
          />
          <div className='messageSender mb-4 pr-4 h-[8%] sm:w-[79%] w-[98%] fixed bottom-0 right-0'>
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
      </div>
    </div>
  );
};

export default ChatBox;
