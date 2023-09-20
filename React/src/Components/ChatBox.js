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
    <div className="Chatbox flex">
      <div className="SideBar flex-col-1 h-screen w-full max-w-[15%] bg-gray-600 text-white shadow-lg text-center">
        <MemberList tab={tab} privateChats={privateChats} setTab={setTab} userData={userData} />
      </div>
      <div className="ChatContentAndInput flex-col-2">
        <div className="ChatContent flex-row-1  max-h-[calc(100vh-8vh)] overflow-y-auto">
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
        <div className="messageSender flex-row-2 fixed bottom-0">
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
  );
};

export default ChatBox;
