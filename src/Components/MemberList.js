import React from "react";


const MemberList = ({ tab, privateChats, setTab }) => {

  return (
            <div className="member-list fixed top-0 left-0 h-screen w-24 m-0 bg-gray-600 text-white shadow-lg text-center">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
  );
};

export default MemberList;





