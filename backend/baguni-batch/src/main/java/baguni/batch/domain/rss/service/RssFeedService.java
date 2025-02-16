package baguni.batch.domain.rss.service;

import java.io.StringReader;
import java.net.URI;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.feed.synd.SyndFeedImpl;
import com.rometools.rome.io.FeedException;
import com.rometools.rome.io.SyndFeedInput;

import baguni.batch.domain.link.service.RssFeedApi;
import baguni.batch.domain.rss.dto.AtomFeed;
import baguni.batch.domain.rss.dto.Article;
import baguni.batch.domain.rss.dto.RssFeed;
import baguni.batch.infrastructure.rss.RssBlogDataHandler;
import baguni.common.event.events.LinkCreateEvent;
import baguni.common.event.messenger.EventMessenger;
import baguni.domain.infrastructure.link.LinkDataHandler;
import baguni.domain.model.link.Link;
import baguni.domain.model.rss.RssBlog;
import io.opentelemetry.instrumentation.annotations.WithSpan;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RssFeedService {

	private final EventMessenger eventMessenger;
	private final RssBlogDataHandler rssBlogDataHandler;
	private final LinkDataHandler linkDataHandler;
	private final RssFeedApi rssFeedApi;
	private final XmlMapper xmlMapper;

	/**
	 * 따로 Retry 로직을 하지 않는 이유는, 매일 3시에 전체 피드 글을 어차피 다시 받기 때문.
	 */
	@WithSpan
	@Scheduled(cron = "0 0 3 * * *")
	public void saveBlogArticleLinks() {
		rssBlogDataHandler.getAllBlogs().stream()
						  .map(blog -> {
							  String xml = rssFeedApi.getFeed(URI.create(blog.getUrl()));
							  return isRss(xml, blog) ? getRssArticles(xml, blog) : getAtomArticles(xml, blog);
						  })
						  .flatMap(List::stream)
						  .filter(this::unsavedLink)
						  .forEach(this::saveLink);
	}

	// Internal Helper Methods ---------------------------------------------
	// RssFeed -> Article
	private List<Article> getRssArticles(String xml, RssBlog blog) {
		try {
			RssFeed rssFeed = xmlMapper.readValue(xml, RssFeed.class);
			return rssFeed.getChannel().getArticles().stream()
						  .map(article -> new Article(article.getTitle(), article.getLink(), article.getPubDate()))
						  .toList();
		} catch (Exception e) {
			log.error("RSS 피드 획득에 실패했습니다. url : {} message : {}", blog.getUrl(), e.getMessage(), e);
			return List.of();
		}
	}

	// AtomFeed -> Article
	private List<Article> getAtomArticles(String xml, RssBlog blog) {
		try {
			AtomFeed atomFeed = xmlMapper.readValue(xml, AtomFeed.class);
			return atomFeed.getArticles().stream()
						   .map(article -> new Article(article.getTitle(), article.getLink().getHref(), article.getUpdated()))
						   .toList();
		} catch (Exception e) {
			log.error("Atom 피드 획득에 실패했습니다. url : {} message : {}", blog.getUrl(), e.getMessage(), e);
			return List.of();
		}
	}

	private boolean unsavedLink(Article article) {
		return !linkDataHandler.existsByUrl(article.link());
	}

	private void saveLink(Article article) {
		Link link;
		try {
			link = Link.createRssLink(article.link(), article.title(), article.date());
		} catch (Exception e) { // pubDate 날짜 형식 파싱 실패
			log.error("RSS PubDate 을 LocalDateTime으로 파싱하는데 실패했습니다. time: {}", article.date(), e);
			link = Link.createRssLink(article.link(), article.title(), null);
		}
		linkDataHandler.saveLink(link);
		eventMessenger.send(new LinkCreateEvent(article.link()));
	}


	/**
	 *  true : rss, false : atom
	 */
	private boolean isRss(String xml, RssBlog blog) {
		SyndFeed syndFeed = parseSyndFeed(xml, blog);
		String feedType = syndFeed.getFeedType().toLowerCase();
		return feedType.contains("rss");
	}

	private SyndFeed parseSyndFeed(String xml, RssBlog blog) {
		try {
			return new SyndFeedInput().build(new StringReader(xml));
		} catch (FeedException e) {
			log.info("Feed 타입 감지 실패. url : {} message : {}", blog.getUrl(), e.getMessage(), e);
			return new SyndFeedImpl(); // 기본 빈 SyndFeed 반환
		}
	}
}
