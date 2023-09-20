import React, { useEffect } from "react";

const MemberList = ({ tab, privateChats, setTab, userData }) => {

        useEffect(() => {}, [privateChats]);

  return (
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"} border bg-gray-400 rounded mb-4`}>Chatroom</li>
                    <li className="rounded mb-4">Private Chats</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"} border ${
                  name == userData.username ? "bg-yellow-200 text-gray-700 " : "bg-gray-700 rounded"
                } `} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
  );

  
};

export default MemberList;





