package baguni.common.exception.level;

import lombok.extern.slf4j.Slf4j;
import baguni.common.exception.base.ApiException;
import baguni.common.util.CachedHttpServletRequest;

@Slf4j
public class FatalErrorLevel extends ErrorLevel {

	@Override
	public void handleError(ApiException exception, CachedHttpServletRequest request) {
		log.error(exception.getMessage(), exception, request);
	}

	@Override
	public void handleError(ApiException exception) {
		log.error(exception.getMessage(), exception);
	}
}
