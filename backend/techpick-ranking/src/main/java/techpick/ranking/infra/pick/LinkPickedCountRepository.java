package techpick.ranking.infra.pick;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinkPickedCountRepository extends MongoRepository<LinkPickedCount, String> {

	Optional<LinkPickedCount> findLinkPickedCountByDateAndUrl(LocalDate date, String url);

	List<LinkPickedCount> findByDateBetween(
		LocalDate startDate,
		LocalDate endDate
	);
}
