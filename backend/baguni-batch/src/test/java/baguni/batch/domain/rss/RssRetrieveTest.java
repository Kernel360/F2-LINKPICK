package baguni.batch.domain.rss;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import baguni.BaguniBatchApplication;
import baguni.batch.domain.link.service.RssFeedApi;
import baguni.batch.domain.rss.service.RssFeedService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ActiveProfiles("local")
@SpringBootTest(classes = BaguniBatchApplication.class)
public class RssRetrieveTest {

	@Autowired
	RssFeedService rssFeedService;

	@Autowired
	RssFeedApi rssFeedApi;

	/**
	 * DB에 블로그 목록이 반드시 존재해야 한다.
	 */
	@Test
	@DisplayName("전체 블로그 feed를 잘 획득하는지 테스트")
	public void test() {
		rssFeedService.saveBlogArticleLinks();
	}
}
