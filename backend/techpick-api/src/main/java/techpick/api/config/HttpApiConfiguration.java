package techpick.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import techpick.api.infrastructure.ranking.RankingRepository;

/**
 * 외부 서버와 통신하는 것을 Http Interface 방식으로 사용하기 위한 설정. <br>
 * - https://docs.spring.io/spring-framework/reference/integration/rest-clients.html#rest-http-interface
 */
@Configuration
public class HttpApiConfiguration {

	@Value("${server-url.ranking-server}")
	private String rankingServerUrl;

	@Bean
	public RankingRepository rankingApi() {
		var restClient = RestClient.create(rankingServerUrl);
		var adapter = RestClientAdapter.create(restClient);
		var proxy = HttpServiceProxyFactory.builderFor(adapter).build();
		return proxy.createClient(RankingRepository.class);
	}
}
