package techpick.core.model.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

	boolean existsBySocialProviderId(String socialProviderId);

	Optional<User> findBySocialProviderId(String socialProviderId);
}
