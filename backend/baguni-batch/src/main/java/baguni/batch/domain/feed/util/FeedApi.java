package baguni.batch.domain.feed.util;

import java.net.URI;

import org.springframework.web.service.annotation.GetExchange;


/**
 * @author minkyeu kim
 * Rss, Atom Feed를 획득하기 위한 Http Interface.
 * String 형태로 xml을 받아 Rss, Atom 타입 구분
 */
public interface FeedApi {

	@GetExchange
	String getFeed(URI uri);
}
