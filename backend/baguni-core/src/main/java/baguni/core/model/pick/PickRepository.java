package baguni.core.model.pick;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import jakarta.persistence.LockModeType;
import jakarta.persistence.QueryHint;
import baguni.core.model.link.Link;
import baguni.core.model.user.User;

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

	List<Pick> findAllByUserId(Long userId);

	@Query("SELECT p from Pick p JOIN FETCH p.link WHERE p.id IN (:pickIdList)")
	List<Pick> findAllById_JoinLink(List<Long> pickIdList);
}
