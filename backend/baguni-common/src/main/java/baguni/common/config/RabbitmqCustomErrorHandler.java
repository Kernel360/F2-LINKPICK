package baguni.common.config;

import org.springframework.amqp.rabbit.listener.ConditionalRejectingErrorHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import baguni.common.event.messenger.EventMessenger;
import baguni.common.exception.base.ApiException;
import baguni.common.util.ErrorLogEventBuilder;
import lombok.RequiredArgsConstructor;

/**
 * Bean 생성 과정에서 순환 참조 발생
 * - [ RabbitMqConfig --> ErrorHandler --> EventMessenger ---> RabbitMqConfig --> ... ]
 * Ref: https://www.baeldung.com/circular-dependencies-in-spring
 *
 * 근본적으로 객체 디자인이 잘못된 거니까 수정이 필요함.
 * 그런데 일단 해결 방법은 @Lazy + Setter Injection을 통해 해결 가능.
 *
 * 추후 해당 부분을 어떻게 해결할 수 있을지 고민해볼 것.
 */
@Component
@RequiredArgsConstructor
public class RabbitmqCustomErrorHandler extends ConditionalRejectingErrorHandler {

	private final ErrorLogEventBuilder errorLogEventBuilder;

	private EventMessenger eventMessenger;

	/**
	 * Lazy Injection (후추 @Lazy를 지울 수 있도록 변경 필요)
	 */
	@Autowired
	public void setEventMessenger(@Lazy EventMessenger eventMessenger) {
		this.eventMessenger = eventMessenger;
	}

	@Override
	public void handleError(Throwable t) {
		if ((t.getCause() instanceof ApiException exception)) {
			var errLogMessage = errorLogEventBuilder.buildWithApiException(exception);
			eventMessenger.send(errLogMessage);
		}
		super.handleError(t);
	}
}
