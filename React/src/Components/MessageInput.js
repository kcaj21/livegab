import React from 'react'

const MessageInput = ({tab,
    userData,
    handleValue,
    sendPublicMessage,
    sendPrivateMessage,
    }) => {

      const handleKeyPress = (event) => {
        if (event.keyCode === 13 || event.which === 13 && tab === "CHATROOM") {
          sendPublicMessage()
        } else if (event.keyCode === 13 || event.which === 13) {
          sendPrivateMessage()
        }}
      

  return (
    <div className="send-message h-full flex flex-col-2">
    <input
      name="message"
      type="text"
      className="input-message w-[80%] border-solid rounded"
      placeholder={
        tab === "CHATROOM"
          ? "Type a public message..."
          : `Type a private message to ${tab}`
      }
      value={userData.message}
      onChange={handleValue}
      onKeyPress={handleKeyPress}
    />
    <button
      type="button"
      className="send-button w-[20%] bg-[#8a9766] text-white"
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