package techpick.collector.domain;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import techpick.collector.entity.Message;

@Component
@RequiredArgsConstructor
public class messageComponent {

	@RabbitListener(queues = "queue1")
	public void receiveMessage1(String message) {
		System.out.println("Queue1 : " + message);
	}

	@RabbitListener(queues = "queue2")
	public void receiveMessage2(String message) {
		System.out.println("Queue2 : " + message);
	}

	@RabbitListener(queues = "queue3")
	public void receiveMessage3(String message) {
		System.out.println("Queue3 : " + message);
	}

}
