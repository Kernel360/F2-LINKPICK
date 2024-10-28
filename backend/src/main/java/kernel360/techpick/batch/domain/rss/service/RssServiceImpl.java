package kernel360.techpick.batch.domain.rss.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.retry.backoff.FixedBackOffPolicy;
import org.springframework.retry.policy.SimpleRetryPolicy;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import kernel360.techpick.batch.domain.rss.dto.RssBlogCommand;
import kernel360.techpick.batch.domain.rss.dto.RssBlogResult;
import kernel360.techpick.batch.domain.rss.dto.RssMapper;
import kernel360.techpick.batch.domain.rss.dto.RssRawFeed;
import kernel360.techpick.batch.domain.rss.exception.ApiRssException;
import kernel360.techpick.batch.infrastructure.rss.RssAdaptor;
import kernel360.techpick.core.annotation.MeasureTime;
import kernel360.techpick.core.model.rss.RssBlog;
import kernel360.techpick.core.model.rss.RssFeed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@EnableScheduling
public class RssServiceImpl implements RssService {

	private final RestTemplate restTemplate;
	private final RssAdaptor rssAdaptor;
	private final RssMapper rssMapper;

	@Override
	@Transactional
	public RssBlogResult saveRssBlog(RssBlogCommand.Create command) {
		return rssMapper.toRssResult(rssAdaptor.saveRssBlog(command));
	}

	@Override
	@Transactional(readOnly = true)
	public List<RssBlogResult> getAllRssBlog() {
		return rssAdaptor.getAllRssBlog().stream()
			.map(rssMapper::toRssResult)
			.toList();
	}

	// 매일 새벽 3시에 수집
	@Scheduled(cron = "0 0 3 * * *")
	@MeasureTime
	public void rssCrawling() {
		ExecutorService executorService = Executors.newFixedThreadPool(5);
		for (var blog : rssAdaptor.getAllRssBlog()) {
			executorService.submit(() -> getAndSaveNewRssData(blog));
		}
		executorService.shutdown();
	}

	private void getAndSaveNewRssData(RssBlog blog) {
		var itemList = getRssItem(blog);
		if (itemList.isPresent()) {
			List<RssFeed> feedList = itemList.get()
				.stream()
				.map(item -> rssMapper.toRssFeed(blog, item))
				.toList();
			// feedList가 ImmutableList기 때문에 ArrayList에 새로 넣어줌..
			rssAdaptor.saveAllDistinctRssFeed(blog, new ArrayList<>(feedList));
		}
	}

	private Optional<List<RssRawFeed.Item>> getRssItem(RssBlog blog) {
		try {
			return Optional.of(apiCallWithRetry(blog.getUrl(), RssRawFeed.class).getChannel().getItem());
		} catch (RestClientException e) {
			log.error("url : {}, error message : {}, error code : {}", blog.getUrl(), e.getMessage(),
				ApiRssException.RSS_NOT_FOUND().getApiErrorCode());
			return Optional.empty();
		}
	}

	private <T> T apiCallWithRetry(String path, Class<T> clazz) {
		final int MAX_ATTEMPTS = 3;
		final int RETRY_INTERVAL = 200;

		RetryTemplate retryTemplate = new RetryTemplate();

		SimpleRetryPolicy retryPolicy = new SimpleRetryPolicy();
		retryPolicy.setMaxAttempts(MAX_ATTEMPTS);
		retryTemplate.setRetryPolicy(retryPolicy);

		FixedBackOffPolicy backOffPolicy = new FixedBackOffPolicy();
		backOffPolicy.setBackOffPeriod(RETRY_INTERVAL);
		retryTemplate.setBackOffPolicy(backOffPolicy);

		return retryTemplate.execute(context -> restTemplate.getForObject(path, clazz));
	}
}
