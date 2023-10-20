import React from 'react'

const Register = ({userData, handleValue, registerUser}) => {
  return (
    <div className=" flex flex-col items-center h-screen justify-center">
    <h1 className='mb-24 text-6xl text-[#FFFFFF] font-extrabold'>livegab</h1>
    <input
      name="username"
      className=" w-[30%] h-[5%] border rounded bg-[#FFFFFF] border-[#7d94b5] text-center mb-4"
      placeholder="Enter your user name"
      value={userData.username}
      onChange={handleValue}
    />
    <button type="button" onClick={registerUser} className="w-[30%] h-[5%] bg-[#c29591] text-white rounded hover:bg-[#b6c199]">
      Join
    </button>
  </div>
  )
}

export default Register