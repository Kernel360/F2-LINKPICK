package techpick.core.event;

import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.core.config.RabbitmqConfig;
import techpick.core.event.events.Event;

@Slf4j
@Primary
@Component
@RequiredArgsConstructor
public class RabbitMqEventMessenger implements EventMessenger {

	private final RabbitTemplate rabbitTemplate;

	@Override
	public void send(Event event) {
		try {
			rabbitTemplate.convertAndSend(RabbitmqConfig.EXCHANGE.EVENT, "", event);
		} catch (AmqpException e) {
			log.error(e.getMessage(), e);
		}
	}
}
