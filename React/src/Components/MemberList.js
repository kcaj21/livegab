import React, { useEffect } from "react";

const MemberList = ({ tab, privateChats, setTab, userData }) => {

        useEffect(() => {}, [privateChats]);

  return (
            <div className="member-list text-center">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"} max-w-[100%] break-words border-b border-[#ffffff29] bg-[#0b0b0b] mb-4`}>Chatroom</li>
                    <li className=' border-[#ffffff29] mb-2'>Signed in as: {userData.username}</li>
                    <li className="max-w-[100%] mt-4 break-words rounded mb-4">Direct Messages</li>
                    {[...privateChats.keys()].map((name,index)=>(
                    <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"} mb-1 bg-primary hover:bg-[#10121a]`} key={index}> {name === userData.username ? '' : name} </li>
                    ))}
                </ul>

            </div>
  );

  
};

export default MemberList;





