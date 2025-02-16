package baguni.batch.domain.feed;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import baguni.BaguniBatchApplication;
import baguni.batch.domain.feed.util.FeedApi;
import baguni.batch.domain.feed.service.FeedService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ActiveProfiles("local")
@SpringBootTest(classes = BaguniBatchApplication.class)
public class RssRetrieveTest {

	@Autowired
	FeedService feedService;

	@Autowired
	FeedApi feedApi;

	/**
	 * DB에 블로그 목록이 반드시 존재해야 한다.
	 */
	@Test
	@DisplayName("전체 블로그 feed를 잘 획득하는지 테스트")
	public void test() {
		feedService.saveBlogArticleLinks();
	}
}
