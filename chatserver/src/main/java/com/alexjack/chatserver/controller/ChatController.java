package com.alexjack.chatserver.controller;

import com.alexjack.chatserver.model.Message;
import com.alexjack.chatserver.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @Autowired

    private SimpMessagingTemplate simpMessagingTemplate;
    private MessageRepository messageRepository;

    @MessageMapping("/message") // if the user wants to send a message to ws, it will be sent to this URL - /app/message
    @SendTo("/chatroom/public")
    private Message receivePublicMessages(@Payload Message message){
        System.out.println(message.getMessage());
        if (messageRepository != null) {
        messageRepository.save(message);}
        return message;
    }

    @MessageMapping("/private-message")
    public Message receivePrivateMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message);
        return message;

    }
}
