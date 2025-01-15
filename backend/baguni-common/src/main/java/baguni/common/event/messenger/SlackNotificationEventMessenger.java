package baguni.common.event.messenger;

import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import baguni.common.config.RabbitmqConfig;
import baguni.common.event.events.Event;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 *  @author sangwon
 * 	현재, EventMessenger 인터페이스의 구현 클래스가 여러 개 생성되고 있음.
 * 	인터페이스를 의존하고 싶어도 구현 클래스가 여러 개가 되면서 어떤 것을 빈 주입해야 할 지 알 수 없어짐.
 *  Qualifier 쓰거나 구현체를 직접 사용하는 방식이 있을 것이다.
 * 	TODO: 지금처럼 여러 클래스를 사용할 것인가? 아니면 EventMessenger 에서 여러 메서드로 분리할 것인가?
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class SlackNotificationEventMessenger implements EventMessenger {

	private final RabbitTemplate rabbitTemplate;

	@Override
	public void send(Event event) {
		try {
			rabbitTemplate.convertAndSend(RabbitmqConfig.EXCHANGE.EVENT, "slack", event);
		} catch (AmqpException e) {
			log.error(e.getMessage(), e);
		}
	}
}
