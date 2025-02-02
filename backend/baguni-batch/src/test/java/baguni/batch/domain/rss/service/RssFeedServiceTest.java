package baguni.batch.domain.rss.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import baguni.BaguniBatchApplication;
import baguni.domain.infrastructure.rss.RssBlogRepository;
import baguni.domain.model.rss.RssBlog;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest(classes = BaguniBatchApplication.class)
@ActiveProfiles("local")
@DisplayName("RSS 서비스 - 통합 테스트")
class RssFeedServiceTest {

	@Autowired
	private RssFeedService rssFeedService;

	@Autowired
	private RssBlogRepository rssBlogRepository;

	@BeforeEach
	void setUp() {
		rssBlogRepository.save(RssBlog.create("우아한형제들", "https://techblog.woowahan.com/feed/"));
		rssBlogRepository.save(RssBlog.create("카카오페이", "https://tech.kakaopay.com/rss"));
	}

	@AfterEach
	void clear() {
		rssBlogRepository.deleteAll();
	}

	@Test
	@DisplayName("RSS 테스트")
	void rssFeed() {
		// given

		// when
		rssFeedService.saveBlogArticleLinks();

		// then
	}
}