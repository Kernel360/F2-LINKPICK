package baguni.common.config;

import org.springframework.amqp.rabbit.listener.ConditionalRejectingErrorHandler;
import org.springframework.stereotype.Component;

import baguni.common.exception.base.ApiException;
import baguni.common.util.ErrorLogEventBuilder;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RabbitmqCustomErrorHandler extends ConditionalRejectingErrorHandler {

	private final ErrorLogEventBuilder errorLogEventBuilder;

	@Override
	public void handleError(Throwable t) {
		if ((t.getCause() instanceof ApiException exception)) {
			errorLogEventBuilder.sendSlackMessage(exception);
		}
		super.handleError(t);
	}
}
