import React, {useRef, useState} from 'react'

const MessageInput = ({tab, userData, handleValue, sendPublicMessage, sendPrivateMessage}) => {

      const handleKeyPress = (event) => {
        if (event.keyCode === 13 || event.which === 13 && tab === "CHATROOM") {
          sendPublicMessage()
        } else if (event.keyCode === 13 || event.which === 13) {
          sendPrivateMessage()
        }
        // console.log(messageLength.value().length)
      }

  // const messageLength = useRef(0)

  return (
    <div className="send-message h-full flex flex-col-2 border bg-[#424549] border-[#424549] rounded-lg hover:border-[#3d4059]">
    <input
      // ref={messageLength}
      minLength={1}
      name="message"
      type="text"
      required
      className="input-message border-[#424549] rounded pl-2 w-[80%] bg-[#424549] "
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
      className="send-button w-[20%]  text-white"
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