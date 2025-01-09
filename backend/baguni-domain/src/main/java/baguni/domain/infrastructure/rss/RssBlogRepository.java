package baguni.domain.infrastructure.rss;

import org.springframework.data.jpa.repository.JpaRepository;

import baguni.domain.model.rss.RssBlog;

public interface RssBlogRepository extends JpaRepository<RssBlog, Long> {
}
