package baguni.ranking.infra.pick;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinkViewCountRepository extends MongoRepository<LinkViewCount, String> {

	Optional<LinkViewCount> findLinkViewCountByDateAndUrl(LocalDate date, String url);

	List<LinkViewCount> findByDateBetween(
		LocalDate startDate,
		LocalDate endDate
	);
}
