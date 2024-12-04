package techpick.core.rabbitmq;

import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.core.config.RabbitmqConfig;

@Slf4j
@Component
@RequiredArgsConstructor
public class EventSender {

    private final RabbitTemplate rabbitTemplate;

    public void sendEvent(Event event) {
        try {
            rabbitTemplate.convertAndSend(RabbitmqConfig.EXCHANGE.EVENT, "", event);
        } catch (AmqpException e) {
            log.error(e.getMessage(), e);
        }
    }
}
