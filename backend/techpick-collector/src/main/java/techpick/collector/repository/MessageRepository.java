package techpick.collector.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import techpick.collector.entity.Message;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {

}
