package techpick.core.exception.level;

import lombok.extern.slf4j.Slf4j;
import techpick.core.exception.base.ApiException;
import techpick.core.util.CachedHttpServletRequest;

@Slf4j
public class WarningErrorLevel extends ErrorLevel {

	@Override
	public void handleError(ApiException exception, CachedHttpServletRequest request) {
		log.warn(exception.getMessage(), exception, request);
	}
}
