package techpick.ranking.infra.pick;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PickCreateCountRepository extends MongoRepository<PickCreateCount, String> {

	Optional<PickCreateCount> findPickCreateCountByDateAndUrl(LocalDate date, String url);

	List<PickCreateCount> findByDateBetween(
		LocalDate startDate,
		LocalDate endDate
	);
}
