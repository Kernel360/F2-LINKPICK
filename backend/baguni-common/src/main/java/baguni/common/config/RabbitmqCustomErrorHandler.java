package baguni.common.config;

import org.springframework.amqp.rabbit.listener.ConditionalRejectingErrorHandler;

import baguni.common.event.messenger.EventMessenger;
import baguni.common.exception.base.ServiceException;
import baguni.common.util.ErrorLogEventBuilder;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RabbitmqCustomErrorHandler extends ConditionalRejectingErrorHandler {

	private final ErrorLogEventBuilder errorLogEventBuilder;

	private final EventMessenger eventMessenger;

	@Override
	public void handleError(Throwable t) {
		if ((t.getCause() instanceof ServiceException exception)) {
			var errLogMessage = errorLogEventBuilder.buildWithServiceException(exception);
			eventMessenger.send(errLogMessage);
		}
		super.handleError(t);
	}
}
