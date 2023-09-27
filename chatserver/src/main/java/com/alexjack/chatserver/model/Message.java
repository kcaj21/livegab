package com.alexjack.chatserver.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Document(collection = "messageCollection")
public class Message {
    @Id
    private String id;
    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private Status status;

}
