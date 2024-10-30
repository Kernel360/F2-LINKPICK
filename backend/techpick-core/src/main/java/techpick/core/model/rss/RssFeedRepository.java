package techpick.core.model.rss;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RssFeedRepository extends JpaRepository<RssFeed, Long> {

	List<RssFeed> findByRssBlogId(Long blogId);

	@Query(value = "select f.url from RssFeed f where f.rssBlogId = :blogId")
	List<String> findAllUrlByBlogId(@Param("blogId") Long blogId);

	List<RssFeed> findByCreatedAtGreaterThanEqualAndCreatedAtLessThan(LocalDateTime from, LocalDateTime to);
}
