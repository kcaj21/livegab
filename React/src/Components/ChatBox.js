import React from 'react';
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
}) => {
  return (
    <div className="Chatbox h-screen flex flex-col-2">
      <div className="SideBar w-full max-w-[15%] bg-gray-600 text-white shadow-lg text-center">
        <MemberList tab={tab} privateChats={privateChats} setTab={setTab} userData={userData} />
      </div>
        <div className='h-[90%] overflow-y-auto'>
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
        <div className="messageSender h-[10%] w-[85%] fixed bottom-0 right-0">
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
