package baguni.common.event.messenger;

import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.common.config.RabbitmqConfig;
import baguni.common.event.events.Event;

@Slf4j
@Primary
@Component
@RequiredArgsConstructor
public class RankingEventMessenger implements EventMessenger {

	private final RabbitTemplate rabbitTemplate;

	@Override
	public void send(Event event) {
		try {
			rabbitTemplate.convertAndSend(RabbitmqConfig.EXCHANGE.EVENT, "ranking", event);
			log.info("이벤트 전송 {} : ", event);
		} catch (AmqpException e) {
			log.error(e.getMessage(), e);
		}
	}
}
