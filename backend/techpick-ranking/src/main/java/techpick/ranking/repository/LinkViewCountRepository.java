package techpick.ranking.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import techpick.ranking.entity.LinkViewCount;

@Repository
public interface LinkViewCountRepository extends MongoRepository<LinkViewCount, String> {


}
