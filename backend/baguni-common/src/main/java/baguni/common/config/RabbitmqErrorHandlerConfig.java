package baguni.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import baguni.common.event.messenger.EventMessenger;
import baguni.common.util.ErrorLogEventBuilder;

@Configuration
public class RabbitmqErrorHandlerConfig {

	/**
	 * 기존에 @Component를 이용해서 자동 주입하는 경우 스프링이 빈을 누구를 먼저 만들지에 대해 꼬이게 됨.
	 * 기존 : RabbitConfig -> RabbitmqCustomErrorHandler -> EventMessenger -> RabbitTemplate (RabbitConfig) -> RabbitmqCustomErrorHandler // 순환 구조
	 * RabbitConfig -> RabbitmqCustomErrorHandler 연관 관계를 끊는게 필수
	 *
	 * RabbitmqCustomErrorHandler의 @Component를 제거하고 직접 @Configuration에서 수동으로 빈 등록하는 것으로 변경
	 * 변경 : RabbitmqCustomErrorHandler -> EventMessenger -> RabbitTemplate (RabbitConfig) // 순환 구조 끊김
	 *
	 * 기존에는 RabbitConfig에서 RabbitmqCustomErrorHandler를 생성자 주입을 받았음.
	 * 변경 후에는 RabbitmqErrorHandlerConfig에서 RabbitmqCustomErrorHandler를 빈으로 등록함.
	 * 스프링 컨테이너에 등록되어 있기 때문에 RabbitConfig에서는 RabbitmqCustomErrorHandler를 필요할 때 컨테이너에서 꺼내서 가져다 쓰게 되어 순환 참조 해결
	 */
	@Bean
	public RabbitmqCustomErrorHandler rabbitmqCustomErrorHandler(
		ErrorLogEventBuilder errorLogEventBuilder,
		EventMessenger eventMessenger
	) {
		return new RabbitmqCustomErrorHandler(errorLogEventBuilder, eventMessenger);
	}
}
