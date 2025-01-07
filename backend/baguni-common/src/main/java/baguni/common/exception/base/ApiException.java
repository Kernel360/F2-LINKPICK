package baguni.common.exception.base;

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
}
