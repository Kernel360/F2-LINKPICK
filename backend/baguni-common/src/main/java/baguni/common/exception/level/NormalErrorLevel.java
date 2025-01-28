package baguni.common.exception.level;

import lombok.extern.slf4j.Slf4j;
import baguni.common.exception.base.ApiException;
import baguni.common.util.CachedHttpServletRequest;

@Slf4j
public class NormalErrorLevel extends ErrorLevel {

	@Override
	public void handleError(Exception exception, CachedHttpServletRequest request) {
		log.error("{}{}", exception.getMessage(), request); // stack trace 미출력
	}

	@Override
	public void handleError(Exception exception) {
		log.error(exception.getMessage(), exception);
	}
}
