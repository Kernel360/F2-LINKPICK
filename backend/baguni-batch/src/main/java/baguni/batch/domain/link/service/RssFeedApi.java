package baguni.batch.domain.link.service;

import java.net.URI;

import org.springframework.web.service.annotation.GetExchange;


/**
 * @author minkyeu kim
 * RssFeed를 획득하기 위한 Http Interface.
 */
public interface RssFeedApi {

	@GetExchange
	String getFeed(URI uri);
}
