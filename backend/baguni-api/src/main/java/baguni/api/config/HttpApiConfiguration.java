package baguni.api.config;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.ClientHttpRequestFactories;
import org.springframework.boot.web.client.ClientHttpRequestFactorySettings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import baguni.api.infrastructure.ranking.RankingApi;

/**
 * 외부 서버와 통신하는 것을 Http Interface 방식으로 사용하기 위한 설정. <br>
 * - https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#rest-http-interface
 * 타임 아웃 설정
 * - https://www.baeldung.com/spring-rest-timeout
 */
@Configuration
public class HttpApiConfiguration {

	@Value("${server-url.ranking-server}")
	private String rankingServerUrl;

	@Bean
	public RankingApi rankingApi(RestClient restClient) {
		var adapter = RestClientAdapter.create(restClient);
		var proxy = HttpServiceProxyFactory.builderFor(adapter).build();
		return proxy.createClient(RankingApi.class);
	}

	@Bean
	public RestClient restClient() {
		return RestClient
			.builder()
			.baseUrl(rankingServerUrl)
			.requestFactory(clientHttpRequestFactory())
			.build();
	}

	@Bean
	public ClientHttpRequestFactory clientHttpRequestFactory() {
		ClientHttpRequestFactorySettings settings = ClientHttpRequestFactorySettings.DEFAULTS
			.withConnectTimeout(Duration.ofSeconds(2))
			.withReadTimeout(Duration.ofSeconds(2));
		return ClientHttpRequestFactories.get(settings);
	}
}
