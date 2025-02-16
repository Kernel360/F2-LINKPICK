package baguni.batch.domain.rss.service;

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
		// Rss
		rssBlogRepository.save(RssBlog.create("네이버 플레이스", "https://medium.com/feed/naver-place-dev"));
		rssBlogRepository.save(RssBlog.create("요기요", "https://techblog.yogiyo.co.kr/feed"));
		rssBlogRepository.save(RssBlog.create("당근", "https://medium.com/feed/daangn"));
		rssBlogRepository.save(RssBlog.create("중고나라", "https://teamblog.joonggonara.co.kr/feed"));
		rssBlogRepository.save(RssBlog.create("한컴", "https://tech.hancom.com/feed/"));
		// Atom
		rssBlogRepository.save(RssBlog.create("네이버", "https://d2.naver.com/d2.atom"));
		rssBlogRepository.save(RssBlog.create("하이퍼커넥트", "https://hyperconnect.github.io/feed"));
		rssBlogRepository.save(RssBlog.create("엔씨소프트", "https://ncsoft.github.io/ncresearch/feed"));
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