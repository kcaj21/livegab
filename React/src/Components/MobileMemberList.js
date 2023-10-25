import React, { useEffect } from "react";

const MobileMemberList = ({ tab, privateChats, setTab, userData, handleSidebarToggle }) => {
  useEffect(() => {
  }, [privateChats]);

  const privateChatUsers = [...privateChats.keys()].filter(
    (name) => name !== userData.username
  );

  return (
    <div className="member-list cursor-default text-[#8d8f92] flex justify-center">
            <div
          onClick={() => {
            setTab("CHATROOM");
            handleSidebarToggle()
          }}
          className={`max-w-[100%] fixed top-0 text-center break-words px-1 cursor-pointer mt-6 hover:bg-primary hover:rounded-md hover:text-[#ffffffb9] font-thin text-lg ${ tab === 'CHATROOM' ? 'text-[#7289da] border rounded-md  border-[#7289da]' : ''}`}
        >
          PUBLIC MESSAGES
        </div>
      <ul className="mt-16">

        <li className={`max-w-[100%] text-center  mb-2 break-words rounded font-thin text-lg ${ tab !== 'CHATROOM' ? 'text-[#7289da] ' : ''}`}>
          DIRECT MESSAGES
        </li>
        <div className="overflow-y-auto max-h-[80vh]">
          {privateChatUsers.map((name, index) => (
            <li
              onClick={() => {
                setTab(name);
                handleSidebarToggle()
              }}
              className={`py-1 px-1 break-all mr-1 ml-1 text-center hover:bg-primary hover:rounded-md hover:text-[#ffffffb9] text-xl ${ name === tab ? 'text-[#ffffffb9] rounded-md border border-[#7289da]' : ''}`}
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

export default MobileMemberList;
