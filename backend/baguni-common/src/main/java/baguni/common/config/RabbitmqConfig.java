package baguni.common.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @see
 * <a href="https://docs.spring.io/spring-amqp/docs/1.5.1.RELEASE/reference/htmlsingle/#collection-declaration">
 *     spring amqp setup
 * </a>
 */
@Configuration
public class RabbitmqConfig {

	public static final class EXCHANGE {
		public static final String NAME = "exchange.domain";
	}

	public static final class QUEUE {
		public static final String LINK_RANKING = "queue.link-ranking";
		public static final String PICK_RANKING_KEY1 = "bookmark.create";
		public static final String PICK_RANKING_KEY2 = "link.read";

		public static final String LINK_UPDATE = "queue.link-analyze";
		public static final String LINK_UPDATE_KEY = "link.*";

		public static final String SLACK_NOTIFICATION = "queue.slack-notification";
		public static final String SLACK_NOTIFICATION_KEY = "log.error";
	}

	@Value("${spring.application.name}")
	private String appName;

	@Value("${spring.rabbitmq.url}")
	private String url;

	@Value("${spring.rabbitmq.username}")
	private String username;

	@Value("${spring.rabbitmq.password}")
	private String password;

	/**
	 * 1. Exchange 구성 */
	@Bean
	TopicExchange exchange() {
		return new TopicExchange(EXCHANGE.NAME);
	}

	@Bean
	public List<Queue> queues() {
		return Arrays.asList(
			new Queue(QUEUE.LINK_RANKING, false),
			new Queue(QUEUE.LINK_UPDATE, false),
			new Queue(QUEUE.SLACK_NOTIFICATION, false)
		);
	}

	@Bean
	List<Binding> bindings() {
		return Arrays.asList(
			// -------- ranking queue
			new Binding(
				QUEUE.LINK_RANKING, Binding.DestinationType.QUEUE,
				EXCHANGE.NAME, QUEUE.PICK_RANKING_KEY1, null
			),
			new Binding(
				QUEUE.LINK_RANKING, Binding.DestinationType.QUEUE,
				EXCHANGE.NAME, QUEUE.PICK_RANKING_KEY2, null
			),
			// -------- link analyze queue
			new Binding(
				QUEUE.LINK_UPDATE, Binding.DestinationType.QUEUE,
				EXCHANGE.NAME, QUEUE.LINK_UPDATE_KEY, null
			),
			// -------- slack notification queue
			new Binding(
				QUEUE.SLACK_NOTIFICATION, Binding.DestinationType.QUEUE,
				EXCHANGE.NAME, QUEUE.SLACK_NOTIFICATION_KEY, null
			)
		);
	}

	/**
	 * 4. RabbitMQ 연결을 위한 ConnectionFactory 구성
	 * application.yaml의 RabbitMQ 사용자 정보를 가져온 후
	 * RabbitMQ 연결에 필요한 ConnectionFactory 구성 */
	@Bean
	ConnectionFactory connectionFactory() {
		CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
		String amqpUri = new StringBuilder()
			.append("amqp://")
			.append(username).append(":").append(password)
			.append("@").append(url)
			.toString();

		connectionFactory.setUri(amqpUri);
		connectionFactory.setConnectionNameStrategy(cn -> appName + "-" + cn);
		return connectionFactory;
	}

	/**
	 * 5. 메시지를 전송하고 수신하기 위한 JSON 타입으로 메시지를 변경
	 * Jackson2JsonMessageConverter를 사용하여 메시지 변환을 수행
	 * JSON 형식으로 메시지를 전송하고 수신 */
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
