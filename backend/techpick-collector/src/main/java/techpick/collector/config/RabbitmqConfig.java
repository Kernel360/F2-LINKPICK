package techpick.collector.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitmqConfig {

	@Value("${spring.rabbitmq.host}")
	private String host;

	@Value("${spring.rabbitmq.port}")
	private int port;

	@Value("${spring.rabbitmq.username}")
	private String username;

	@Value("${spring.rabbitmq.password}")
	private String password;

	/**
	 * 1. Exchange 구성
	 */
	@Bean
	DirectExchange directExchange() {
		return new DirectExchange("exchange.direct");
	}

	@Bean
	FanoutExchange fanoutExchange() {
		return new FanoutExchange("exchange.fanout");
	}

	/**
	 * 2. 큐 구성
	 */
	@Bean
	Queue queue1() {
		return new Queue("queue1", false);
	}

	@Bean
	Queue queue2() {
		return new Queue("queue2", false);
	}

	@Bean
	Queue queue3() {
		return new Queue("queue3", false);
	}

	/**
	 * 3. 큐와 DirectExchange를 바인딩
	 */
	@Bean
	Binding directBinding(DirectExchange directExchange, Queue queue1) {
		return BindingBuilder
			.bind(queue1)
			.to(directExchange)
			.with("direct.key"); // 라우팅 키
	}

	@Bean
	Binding fanoutBinding1(FanoutExchange fanoutExchange, Queue queue2) {
		return BindingBuilder
			.bind(queue2)
			.to(fanoutExchange);
	}

	@Bean
	Binding fanoutBinding2(FanoutExchange fanoutExchange, Queue queue3) {
		return BindingBuilder
			.bind(queue3)
			.to(fanoutExchange);
	}


	/**
	 * 4. RabbitMQ 연결을 위한 ConnectionFactory 구성
	 * application.yaml의 RabbitMQ 사용자 정보를 가져온 후
	 * RabbitMQ 연결에 필요한 ConnectionFactory 구성
	 */
	@Bean
	ConnectionFactory connectionFactory() {
		CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
		connectionFactory.setHost(host);
		connectionFactory.setPort(port);
		connectionFactory.setUsername(username);
		connectionFactory.setPassword(password);
		return connectionFactory;
	}

	/**
	 * 5. 메시지를 전송하고 수신하기 위한 JSON 타입으로 메시지를 변경
	 * Jackson2JsonMessageConverter를 사용하여 메시지 변환을 수행
	 * JSON 형식으로 메시지를 전송하고 수신
	 */
	@Bean
	MessageConverter messageConverter() {
		return new Jackson2JsonMessageConverter();
	}

	/**
	 * 6. 구성한 ConnectionFactory, MessageConverter를 통해 템플릿 구성
	 */
	@Bean
	RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
		RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
		rabbitTemplate.setMessageConverter(messageConverter);
		return rabbitTemplate;
	}
}
