package kernel360.techpick.core.model.link;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LinkRepository extends JpaRepository<Link, Long> {

    Optional<Link> findByUrl(String url);
}
