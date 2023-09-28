package com.alexjack.chatserver.controller;

import com.alexjack.chatserver.model.Message;
import com.alexjack.chatserver.model.Status;
import com.alexjack.chatserver.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Controller
public class ChatController {
    @Autowired

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageRepository messageRepository;

    @Autowired
    public ChatController(SimpMessagingTemplate simpMessagingTemplate, MessageRepository messageRepository) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.messageRepository = messageRepository;
    }

    @MessageMapping("/message") // if the user wants to send a message to ws, it will be sent to this URL - /app/message
    @SendTo("/chatroom/public")
    private Message receivePublicMessages(@Payload Message message){
        return messageRepository.save(message);
    }

    @MessageMapping("/private-message")
    public Message receivePrivateMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message);
        return message;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/allMessages")
    public ResponseEntity<List<Message>> getAllMessages(){
        List<Message> allMessages = messageRepository.findAll();
        return ResponseEntity.ok(allMessages);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/allMessages/{Status}")
    public ResponseEntity<List<Message>> getAllMessages(@RequestParam(name="status", required=false) Status status){
        List<Message> filteredMessages = messageRepository.findMessagesByStatus(status);
        System.out.println(filteredMessages);
        return new ResponseEntity<>(filteredMessages, HttpStatus.OK);

    }
}
