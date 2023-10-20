import React, { useEffect } from "react";

const MemberList = ({ tab, privateChats, setTab, userData }) => {

        useEffect(() => {}, [privateChats]);

  return (
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"} max-w-[100%] break-words  border bg-gray-400 rounded mb-4`}>Chatroom</li>
                    <li className="max-w-[100%] break-words rounded mb-4">Private Chats</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"} mb-1  ${
                  name == userData.username ? "bg-[#007acc] text-[#FFFFFF] rounded" : "bg-primary hover:bg-[#10121a]"
                } `} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
  );

  
};

export default MemberList;





