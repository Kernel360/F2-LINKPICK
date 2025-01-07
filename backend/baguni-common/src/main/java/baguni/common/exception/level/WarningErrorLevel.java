package baguni.common.exception.level;

import lombok.extern.slf4j.Slf4j;
import baguni.common.exception.base.ApiException;
import baguni.common.util.CachedHttpServletRequest;

@Slf4j
public class WarningErrorLevel extends ErrorLevel {

	@Override
	public void handleError(ApiException exception, CachedHttpServletRequest request) {
		log.warn(exception.getMessage(), exception, request);
	}

	@Override
	public void handleError(ApiException exception) {
		log.warn(exception.getMessage(), exception);
	}
}
