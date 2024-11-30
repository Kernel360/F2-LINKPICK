package techpick.collector.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import techpick.collector.entity.PickPick;

@Repository
public interface PickPickRepository extends MongoRepository<PickPick, String> {
}
