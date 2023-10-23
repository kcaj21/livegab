import React, { useEffect } from "react";

const MemberList = ({ tab, privateChats, setTab, userData }) => {

        useEffect(() => {}, [privateChats]);

  

  return (
            <div className="member-list cursor-default text-[#8d8f92] text-center">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"} max-w-[100%] break-words cursor-pointer mb-4`}>Chatroom</li>
                    <li className=' border-[#ffffff29] mb-2'>Signed in as: {userData.username}</li>
                    <li className="max-w-[100%] py-4 break-words rounded font-thin md:text-lg text-sm">DIRECT MESSAGES</li>
                    {[...privateChats.keys()].map((name,index)=>( name !== userData.username ? (
                    <li onClick={()=>{ {setTab(name)}}} className={`member ${tab===name && "active"} py-1  mr-1 ml-1 cursor-pointer hover:bg-primary hover:border hover:border-rounded hover:rounded-md hover:border-[#36393e] hover:text-[#ffffffb9]`} key={index}> {name === userData.username ? '' : name}  </li> ) : null
                    ))}
                </ul>

            </div>
  );

  
};

export default MemberList;