import React from "react";


const MemberList = ({ tab, privateChats, setTab }) => {

  return (
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"} border bg-gray-400 rounded mb-4`}>Chatroom</li>
                    <li className="rounded mb-4">Private Chats</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"} border bg-gray-700 rounded`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
  );
};

export default MemberList;





