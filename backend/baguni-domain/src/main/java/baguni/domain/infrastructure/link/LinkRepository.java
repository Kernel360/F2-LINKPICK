package baguni.domain.infrastructure.link;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import baguni.domain.model.link.Link;

public interface LinkRepository extends JpaRepository<Link, Long> {

	Optional<Link> findByUrl(String url);

	boolean existsByUrl(String url);
}
