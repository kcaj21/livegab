import React, { useEffect } from "react";

const DesktopSideBar = ({ tab, privateChats, setTab, userData }) => {

  useEffect(() => {
  }, [privateChats]);

  const privateChatUsers = [...privateChats.keys()].filter(
    (name) => name !== userData.username
  );

  return (
    <div className="cursor-default text-[#8d8f92] flex justify-center">
      <ul>
        <li
          onClick={() => {
            setTab("CHATROOM");
          }}
          className={`max-w-[100%] text-center break-words cursor-pointer ml-2 mt-6 hover:bg-primary hover:rounded-md hover:text-[#ffffffb9] font-thin text-lg ${ 
          tab === 'CHATROOM' 
          ? 'text-[#7289da] ' 
          : ''}`}
        >
          PUBLIC MESSAGES
        </li>
        <li className={`max-w-[100%] text-center ml-2 mt-6 mb-2 break-words rounded font-thin text-lg ${ 
          tab !== 'CHATROOM' 
          ? 'text-[#7289da] ' 
          : ''}`}
          >
          DIRECT MESSAGES
        </li>
        <div className="overflow-y-auto max-h-[80vh]">
          {privateChatUsers.map((name, index) => (
            <li
              onClick={() => {
                setTab(name);
              }}
              className={`py-1 px-1 break-all mr-1 ml-1 mb-1 text-center cursor-pointer hover:bg-primary hover:rounded-md hover:text-[#ffffffb9] text-xl ${ 
              name === tab 
              ? 'text-[#FFFFFF] rounded-md border border-[#7289da]' 
              : ''}`}
              key={index}
            >
            {name === userData.username ? "" : name}
            </li>
          ))}
        </div>
      </ul>
      <div className="fixed py-6 mx-2 bottom-0 break-all font-thin border-[#ffffff29] mt-4">
        Signed in as: {userData.username}
      </div>
    </div>
  );
};

export default DesktopSideBar;
