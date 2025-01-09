package baguni.common.event.messenger;

import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import baguni.common.config.RabbitmqConfig;
import baguni.common.event.events.Event;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class CrawlingEventMessenger implements EventMessenger {

	private final RabbitTemplate rabbitTemplate;

	@Override
	public void send(Event event) {
		try {
			rabbitTemplate.convertAndSend(RabbitmqConfig.EXCHANGE.CRAWLING_EVENT, "", event);
		} catch (AmqpException e) {
			log.error(e.getMessage(), e);
		}
	}
}
