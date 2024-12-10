package techpick.ranking.infra.sharedFolder;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SharedFolderPickViewCountRepository
	extends MongoRepository<SharedFolderPickViewCount, String> {

	Optional<SharedFolderPickViewCount> findSharedFolderPickViewCountByDateAndUrl(LocalDate date, String url);
}
