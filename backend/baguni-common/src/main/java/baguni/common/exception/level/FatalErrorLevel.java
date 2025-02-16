package baguni.common.exception.level;

import lombok.extern.slf4j.Slf4j;
import baguni.common.util.CachedHttpServletRequest;

@Slf4j
public class FatalErrorLevel extends ErrorLevel {

	@Override
	public void logByLevel(Exception exception, CachedHttpServletRequest request) {
		log.error("{}{}", exception.getMessage(), request, exception); // stack trace 출력
	}

	@Override
	public void logByLevel(Exception exception) {
		log.error(exception.getMessage(), exception);
	}
}
