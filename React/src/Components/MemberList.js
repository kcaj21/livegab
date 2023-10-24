import React, { useEffect } from "react";

const MemberList = ({ tab, privateChats, setTab, userData }) => {

        useEffect(() => {}, [privateChats]);

  

  return (
            <div className="member-list cursor-default text-[#8d8f92] flex justify-center">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className= 'max-w-[100%] break-words cursor-pointer mt-6  hover:bg-primary hover:border hover:border-rounded hover:rounded-md hover:border-[#36393e] hover:text-[#ffffffb9] font-thin md:text-lg text-sm'>PUBLIC MESSAGES</li>
                    <li className="max-w-[100%] mt-6 mb-2 break-words rounded font-thin md:text-lg text-sm">DIRECT MESSAGES</li>
                    {[...privateChats.keys()].map((name,index)=>( name !== userData.username ? (
                    <li onClick={()=>{ {setTab(name)}}} className='py-1 break-all mr-1 ml-1 cursor-pointer hover:bg-primary hover:border hover:border-rounded hover:rounded-md hover:border-[#36393e] hover:text-[#ffffffb9]' key={index}> {name === userData.username ? '' : name}  </li> ) : null
                    ))}
                </ul>
                <div className='fixed bottom-0 break-all font-thin mb-2 text-center border-[#ffffff29] mt-4'>Signed in as: {userData.username}</div>
                

            </div>
  );

  
};

export default MemberList;