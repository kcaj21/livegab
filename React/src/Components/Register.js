import React from 'react'

const Register = ({userData, handleValue, registerUser}) => {
  return (
    <div className="register">
    <input
      name="username"
      className="user-name flex items-center w-[12rem]"
      placeholder="Enter your user name"
      value={userData.username}
      onChange={handleValue}
    />
    <button type="button" onClick={registerUser} className="text-white border-solid rounded bg-green-800 w-[12rem]">
      Join
    </button>
  </div>
  )
}

export default Register