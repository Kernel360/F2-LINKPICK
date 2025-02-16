package baguni.batch.config;

import java.time.Duration;

import org.springframework.boot.web.client.ClientHttpRequestFactories;
import org.springframework.boot.web.client.ClientHttpRequestFactorySettings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import baguni.batch.domain.feed.util.FeedApi;

@Configuration
public class RestClientConfig {

	private static final Duration CONNECTION_TIMEOUT = Duration.ofSeconds(5);
	private static final Duration READ_TIMEOUT = Duration.ofSeconds(10);
	private static final String USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36";

	@Bean
	public FeedApi rssFeedApi(RestClient restClient) {
		var adapter = RestClientAdapter.create(restClient);
		var proxy = HttpServiceProxyFactory.builderFor(adapter).build();
		return proxy.createClient(FeedApi.class);
	}

	@Bean
	public RestClient restClient(RestClient.Builder restClientBuilder) {
		return restClientBuilder
			.defaultHeader(HttpHeaders.USER_AGENT, USER_AGENT)
			.requestFactory(clientHttpRequestFactory())
			.build();
	}

	@Bean
	public ClientHttpRequestFactory clientHttpRequestFactory() {
		ClientHttpRequestFactorySettings settings = ClientHttpRequestFactorySettings.DEFAULTS
			.withConnectTimeout(CONNECTION_TIMEOUT)
			.withReadTimeout(READ_TIMEOUT);
		return ClientHttpRequestFactories.get(settings);
	}
}
