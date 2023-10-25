package com.alexjack.chatserver.repositories;

import com.alexjack.chatserver.model.Status;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.alexjack.chatserver.model.Message;
import java.util.List;

public interface MessageRepository extends MongoRepository <Message, Long> {
    List<Message> findMessagesByStatus(final Status status);
}