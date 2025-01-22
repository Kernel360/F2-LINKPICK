package baguni.batch.domain.rss.service;

import java.net.URI;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.hibernate.event.spi.EventManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import baguni.batch.domain.link.service.RssFeedApi;
import baguni.batch.domain.rss.dto.RssFeed;
import baguni.batch.infrastructure.rss.RssBlogDataHandler;
import baguni.common.annotation.MeasureTime;
import baguni.common.event.events.LinkCrawlingEvent;
import baguni.common.event.messenger.CrawlingEventMessenger;
import baguni.domain.infrastructure.link.LinkDataHandler;
import baguni.domain.model.link.Link;
import baguni.domain.model.rss.RssBlog;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RssFeedService {

	private final CrawlingEventMessenger crawlingEventMessenger;
	private final RssBlogDataHandler rssBlogDataHandler;
	private final LinkDataHandler linkDataHandler;
	private final RssFeedApi rssFeedApi;

	/**
	 * 따로 Retry 로직을 하지 않는 이유는, 매일 3시에 전체 피드 글을 어차피 다시 받기 때문.
	 */
	@MeasureTime
	@Scheduled(cron = "0 0 3 * * *")
	public void saveBlogArticleLinks() {
		rssBlogDataHandler.getAllBlogs().stream()
						  .map(this::getArticles)
						  .flatMap(Optional::stream)
						  .flatMap(Collection::stream)
						  .filter(this::unsavedLink)
						  .forEach(this::saveLink);
	}

	// Internal Helper Methods ---------------------------------------------

	private Optional<List<RssFeed.Article>> getArticles(RssBlog blog) {
		try {
			return Optional.of(rssFeedApi.getFeed(URI.create(blog.getUrl()))
										 .getChannel()
										 .getArticles());
		} catch (Exception e) {
			log.error("RSS 피드 획득에 실패했습니다. url:{} message:{}", blog.getUrl(), e.getMessage());
			return Optional.empty();
		}
	}

	private boolean unsavedLink(RssFeed.Article article) {
		return (false == linkDataHandler.existsByUrl(article.getLink()));
	}

	private void saveLink(RssFeed.Article article) {
		Link link = null;
		try {
			link = Link.createRssLink(article.getLink(), article.getTitle(), article.getPubDate());
		} catch (Exception e) { // pubDate 날짜 형식 파싱 실패
			log.error("RSS PubDate 을 LocalDateTime으로 파싱하는데 실패했습니다. time: {}", article.getPubDate());
			link = Link.createRssLink(article.getLink(), article.getTitle(), null);
		}
		linkDataHandler.saveLink(link);
		crawlingEventMessenger.send(new LinkCrawlingEvent(article.getLink()));
	}
}
