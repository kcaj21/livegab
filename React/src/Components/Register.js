import React from 'react'

const Register = ({userData, handleValue, registerUser}) => {
  
  return (

    <div className=" flex flex-col items-center h-screen justify-center">
    <h1 className='mb-24 text-6xl text-[#FFFFFF] font-extrabold'>livegab</h1>
    <input
      name="username"
      type='text'
      className="w-[30%] h-[5%] border text-slate-400 rounded bg-[#282A3A] border-[#7d94b5] text-center mb-4"
      placeholder="Enter your username"
      value={userData.username}
      onChange={handleValue}
    />
    <button
    id='reg-btn'
    onClick={registerUser}
    className="glass w-[30%] h-[5%] cursor:pointer bg-[#007acc] text-white rounded hover:bg-[#2790d5]">
      Join
    </button>
  </div>
  
  )
}

export default Register