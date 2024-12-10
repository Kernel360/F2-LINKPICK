package techpick.api.domain.user.service.strategy;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InitStrategyConfiguration {

	@Bean
	public List<ContentInitStrategy> contentInitStrategies(
		@Qualifier("app-manual") ContentInitStrategy strategy1,
		@Qualifier("hot-contents") ContentInitStrategy strategy2
	) {
		return List.of(strategy1, strategy2);
	}
}
