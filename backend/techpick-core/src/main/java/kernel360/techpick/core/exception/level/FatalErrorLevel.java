package kernel360.techpick.core.exception.level;

import kernel360.techpick.core.exception.base.ApiException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FatalErrorLevel extends ErrorLevel {

	@Override
	public void handleError(ApiException exception) {
		log.error(exception.getMessage(), exception);
	}
}
