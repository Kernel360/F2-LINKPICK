package techpick.core.model.pick;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import jakarta.persistence.LockModeType;
import jakarta.persistence.QueryHint;
import techpick.core.model.link.Link;
import techpick.core.model.user.User;

public interface PickRepository extends JpaRepository<Pick, Long> {

	Optional<Pick> findByUserIdAndLinkUrl(Long userId, String url);

	@Lock(value = LockModeType.PESSIMISTIC_WRITE)
	@QueryHints({
		@QueryHint(name = "javax.persistence.lock.timeout", value = "3000")
	})
	@Query("SELECT p FROM Pick p WHERE p.id = :id")
	Optional<Pick> findByIdForUpdate(Long id);

	Optional<Pick> findByUserAndLink(User user, Link link);

	boolean existsByUserIdAndLink(Long userId, Link link);
}
