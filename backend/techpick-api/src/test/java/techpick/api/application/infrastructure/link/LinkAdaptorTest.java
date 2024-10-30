package techpick.api.application.infrastructure.link;

import static org.assertj.core.api.Assertions.*;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import techpick.TechPickApiApplication;
import techpick.api.domain.link.dto.LinkInfo;
import techpick.api.infrastructure.link.LinkAdaptor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest(classes = TechPickApiApplication.class)
@ActiveProfiles("test")
class LinkAdaptorTest {

	@Autowired
	LinkAdaptor linkAdaptor;

	@Test
	@DisplayName("""
		    동시적으로 같은 링크 생성 요청이 들어올 경우, 하나만 생성되고 나머지는 실패해야 한다.
		""")
	@Transactional
	void create_multiple_link_concurrent_test() throws InterruptedException {
		// given
		int threadCount = 20;
		ExecutorService executorService = Executors.newFixedThreadPool(threadCount);
		CountDownLatch countDownLatch = new CountDownLatch(threadCount);

		AtomicInteger successCount = new AtomicInteger();
		AtomicInteger failCount = new AtomicInteger();

		LinkInfo linkInfo = new LinkInfo("linkUrl", "linkTitle", "linkDescription", "imageUrl", null);

		// when
		for (int i = 0; i < threadCount; i++) {
			executorService.submit(() -> {
				try {
					linkAdaptor.saveLink(linkInfo);
					successCount.incrementAndGet(); // 성공 카운트
				} catch (Exception e) {
					log.info(e.getMessage());
					failCount.incrementAndGet(); // 실패 카운트
				} finally {
					countDownLatch.countDown();
				}
			});
		}

		countDownLatch.await(); // 모든 스레드가 완료될 때까지 대기
		executorService.shutdown();

		// then
		log.info("success : {} ", successCount.get());
		log.info("fail : {} ", failCount.get());

		assertThat(successCount.get()).isEqualTo(1);
		assertThat(failCount.get()).isEqualTo(threadCount - 1);
	}
}