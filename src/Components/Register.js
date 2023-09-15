import React from 'react'

const Register = ({userData, handleValue, registerUser}) => {
  return (
    <div className="register">
    <input
      name="username"
      id="user-name"
      placeholder="Enter your user name"
      value={userData.username}
      onChange={handleValue}
    />
    <button type="button" onClick={registerUser}>
      connected
    </button>
  </div>
  )
}

export default Register