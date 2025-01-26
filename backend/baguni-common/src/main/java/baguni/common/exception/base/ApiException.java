package baguni.common.exception.base;

import baguni.common.exception.level.FatalErrorLevel;
import baguni.common.exception.level.WarningErrorLevel;
import baguni.common.util.CachedHttpServletRequest;

public abstract class ApiException extends RuntimeException {

	private final ApiErrorCode errorCode;

	protected ApiException(ApiErrorCode errorCode) {
		super(errorCode.toString());
		this.errorCode = errorCode;
	}

	public final ApiErrorCode getApiErrorCode() {
		return errorCode;
	}

	public final void handleErrorByLevel(CachedHttpServletRequest request) {
		errorCode.getErrorLevel().handleError(this, request);
	}

	public final boolean isFatal() {
		return (this.errorCode.getErrorLevel() instanceof FatalErrorLevel);
	}

	public final boolean isWarning() {
		return (this.errorCode.getErrorLevel() instanceof WarningErrorLevel);
	}
}
