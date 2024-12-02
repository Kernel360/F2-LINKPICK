package techpick.ranking;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinkViewCountRepository extends MongoRepository<LinkViewCount, String> {

    Optional<LinkViewCount> findLinkViewCountByDateAndUrl(LocalDate date, String url);

    List<LinkViewCount> findAllByDateOrderByCountDesc(LocalDate date);

    List<LinkViewCount> findByDate(LocalDate date, Sort sort, Limit limit);

    List<LinkViewCount> findByDateBetweenOrderByCountDesc(
        LocalDate startDate,
        LocalDate endDate,
        Limit limit
    );
}
