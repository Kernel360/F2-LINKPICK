package techpick.core.exception.level;

import lombok.extern.slf4j.Slf4j;
import techpick.core.exception.base.ApiException;

@Slf4j
public class WarningErrorLevel extends ErrorLevel {

	@Override
	public void handleError(ApiException exception) {
		log.warn(exception.getMessage(), exception);
	}
}
