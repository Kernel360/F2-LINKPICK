package techpick.api.domain.user.service.strategy;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InitStrategyConfiguration {

	/**
	 * 나중에 넣은게 위에 올라가기 때문에,
	 * hot-contents 부터 먼저 넣어줘야 상단에 manual이 표시된다.
	 */
	@Bean
	public List<ContentInitStrategy> contentInitStrategies(
		@Qualifier("app-manual") ContentInitStrategy appManual,
		@Qualifier("hot-contents") ContentInitStrategy hotContents
	) {
		return List.of(hotContents, appManual);
	}
}
