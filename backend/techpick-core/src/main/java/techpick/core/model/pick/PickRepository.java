package techpick.core.model.pick;

import java.util.List;
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

	Optional<Pick> findByUserAndLink(User user, Link link);

	boolean existsByUserIdAndLink(Long userId, Link link);

	@Query("SELECT p.id FROM Pick p WHERE p.user.id = :userId")
	List<Long> findIdAllByUserId(Long userId);

	@Query("SELECT p from Pick p JOIN FETCH p.link WHERE p.id IN (:pickIdList)")
	List<Pick> findAllById_JoinLink(List<Long> pickIdList);
}
