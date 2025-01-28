package baguni.batch.config;

import java.time.Duration;

import org.springframework.boot.web.client.ClientHttpRequestFactories;
import org.springframework.boot.web.client.ClientHttpRequestFactorySettings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.converter.xml.MappingJackson2XmlHttpMessageConverter;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import baguni.batch.domain.link.service.RssFeedApi;

@Configuration
public class RestClientConfig {

	private static final Duration CONNECTION_TIMEOUT = Duration.ofSeconds(5);
	private static final Duration READ_TIMEOUT = Duration.ofSeconds(5);

	@Bean
	public RssFeedApi rssFeedApi(RestClient restClient) {
		var adapter = RestClientAdapter.create(restClient);
		var proxy = HttpServiceProxyFactory.builderFor(adapter).build();
		return proxy.createClient(RssFeedApi.class);
	}

	@Bean
	public RestClient restClient(RestClient.Builder restClientBuilder) {
		return restClientBuilder
			.messageConverters(converter -> {
				converter.add(new MappingJackson2XmlHttpMessageConverter());
			})
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
