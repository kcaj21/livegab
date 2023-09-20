import React from 'react'

const MessageInput = ({tab,
    userData,
    handleValue,
    sendPublicMessage,
    sendPrivateMessage,
    }) => {
  return (
    <div className="send-message w-[80rem]">
    <input className="text-box"
      name="message"
      type="text"
      className="input-message w-[85%] h-[4rem] max-h-[4rem] border-solid rounded"
      placeholder={
        tab === "CHATROOM"
          ? "Type a public message..."
          : `Type a private message to ${tab}`
      }
      value={userData.message}
      onChange={handleValue}
    />
    <button
      type="button"
      className="send-button w-[15%] h-[4rem] bg-green-800 text-white"
      onClick={
        tab === "CHATROOM" ? sendPublicMessage : sendPrivateMessage
      }
    >
      Send
    </button>
  </div>
  )
}

export default MessageInput