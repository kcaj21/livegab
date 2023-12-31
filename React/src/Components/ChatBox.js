import React, { useEffect, useRef, useState } from 'react';
import DesktopSideBar from './DesktopSideBar';
import MobileSideBar from './MobileSideBar';
import ChatContent from './ChatContent';
import MessageInput from './MessageInput';
import SideBarToggle from './SideBarToggle';

const ChatBox = ({isLoadingChatHistory, tab, userData, publicChats, privateChats, handleValue, sendPublicMessage, sendPrivateMessage, setTab}) => {

  const chatContentRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    initialScroll();
  }, );

  useEffect(() => {
    autoScroll();
  }, [publicChats, privateChats]);

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

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    
    <div className='drop-shadow-md'>
      <div className='ml-1'>
        <SideBarToggle
        className='drop-shadow-xl'
        handleSidebarToggle={handleSidebarToggle} 
        sidebarOpen={sidebarOpen} 
        />
      </div>
      {
        !sidebarOpen ? 
        null : (
          <div className='fixed border-r-2 border-[#27292c] left-0 z-10 h-screen bg-[#282b30]  w-full'>
              <MobileSideBar
              isLoadingChatHistory={isLoadingChatHistory}
              tab={tab} 
              privateChats={privateChats} 
              setTab={setTab} userData={userData} 
              handleSidebarToggle={handleSidebarToggle}
              />
          </div>
        )
      }
      <div className='Chatbox  h-screen flex flex-col-1'>
        <div className=' w-full max-w-[20%] bg-[#282b30] hidden sm:block  text-white shadow-lg'>
          <DesktopSideBar isLoadingChatHistory={isLoadingChatHistory} tab={tab}  privateChats={privateChats} setTab={setTab} userData={userData}/>
        </div>
        <div className='h-[90%]  sm:ml-0 ml-8 w-screen overflow-y-auto'
        ref={chatContentRef}>
          <ChatContent
            tab={tab}
            userData={userData}
            publicChats={publicChats}
            privateChats={privateChats}
            handleValue={handleValue}
            sendPublicMessage={sendPublicMessage}
            sendPrivateMessage={sendPrivateMessage}
          />
          <div className='mb-4 pr-4 h-[8%] sm:w-[79%] w-[98%] fixed bottom-0 right-0'>
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
