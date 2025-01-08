package baguni.domain.infrastructure.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import baguni.domain.model.user.SocialProvider;
import baguni.domain.model.user.User;
import baguni.domain.model.util.IDToken;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findBySocialProviderAndSocialProviderId(SocialProvider socialProvider, String socialProviderId);

	Optional<User> findByIdToken(IDToken idToken);
}
