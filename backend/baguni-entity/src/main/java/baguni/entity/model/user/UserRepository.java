package baguni.entity.model.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import baguni.entity.model.util.IDToken;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findBySocialProviderAndSocialProviderId(SocialProvider socialProvider, String socialProviderId);

	Optional<User> findByIdToken(IDToken idToken);
}
