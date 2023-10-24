import React, { useEffect } from "react";

const MemberList = ({ tab, privateChats, setTab, userData }) => {
  useEffect(() => {
  }, [privateChats]);

  const privateChatUsers = [...privateChats.keys()].filter(
    (name) => name !== userData.username
  );

  return (
    <div className="member-list cursor-default text-[#8d8f92] flex justify-center">
      <ul className="">
        <li
          onClick={() => {
            setTab("CHATROOM");
          }}
          className="max-w-[100%] text-center break-words cursor-pointer ml-2 mt-6 hover:bg-primary hover:rounded-md hover:text-[#ffffffb9] font-thin md:text-lg text-xs"
        >
          PUBLIC MESSAGES
        </li>
        <li className="max-w-[100%] text-center ml-2 mt-6 mb-2 break-words rounded font-thin md:text-lg text-xs">
          DIRECT MESSAGES
        </li>
        <div className="overflow-y-auto max-h-[80vh]">
          {privateChatUsers.map((name, index) => (
            <li
              onClick={() => {
                setTab(name);
              }}
              className="py-1 px-1 break-all mr-1 ml-1 cursor-pointer hover:bg-primary hover:rounded-md hover:text-[#ffffffb9] md:text-base text-xs"
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

export default MemberList;
