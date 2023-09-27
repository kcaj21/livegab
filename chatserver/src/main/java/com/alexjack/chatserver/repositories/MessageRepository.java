package com.alexjack.chatserver.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.alexjack.chatserver.model.Message;

public interface MessageRepository extends MongoRepository <Message, Long> {
}
