package techpick.core.model.pick;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import techpick.core.model.link.Link;
import techpick.core.model.user.User;

public interface PickRepository extends JpaRepository<Pick, Long> {

	Optional<Pick> findByUserIdAndLinkUrl(Long userId, String url);

	Optional<Pick> findByUserAndLink(User user, Link link);
}
