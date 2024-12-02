package techpick.ranking.domain;

import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.core.rabbitmq.Event;
import techpick.core.rabbitmq.RabbitmqConfig;
import techpick.ranking.repository.LinkViewCountRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class LinkViewCountService {

	private final LinkViewCountRepository linkViewCountRepository;

	@RabbitListener(bindings = @QueueBinding(
		value = @Queue(value = RabbitmqConfig.QUEUE.Q1),
		exchange = @Exchange(value = RabbitmqConfig.EXCHANGE.EVENT, ignoreDeclarationExceptions = "true"),
		key = ""
	))
	public void insert(String message, Event event) {
		log.info("message : {}", message);
		log.info("event : {}", event);
	}
}
