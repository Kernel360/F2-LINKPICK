package baguni.api.domain.pick.exception;

import baguni.core.exception.base.ApiErrorCode;
import baguni.core.exception.base.ApiException;

public class ApiPickException extends ApiException {

	private ApiPickException(ApiErrorCode errorCode) {
		super(errorCode);
	}

	public static ApiPickException PICK_NOT_FOUND() {
		return new ApiPickException(ApiPickErrorCode.PICK_NOT_FOUND);
	}

	public static ApiPickException PICK_MUST_BE_UNIQUE_FOR_A_URL() {
		return new ApiPickException(ApiPickErrorCode.PICK_ALREADY_EXIST);
	}

	public static ApiPickException PICK_UNAUTHORIZED_USER_ACCESS() {
		return new ApiPickException(ApiPickErrorCode.PICK_UNAUTHORIZED_USER_ACCESS);
	}

	public static ApiPickException PICK_UNAUTHORIZED_ROOT_ACCESS() {
		return new ApiPickException(ApiPickErrorCode.PICK_UNAUTHORIZED_ROOT_ACCESS);
	}

	public static ApiPickException PICK_DELETE_NOT_ALLOWED() {
		return new ApiPickException(ApiPickErrorCode.PICK_DELETE_NOT_ALLOWED);
	}

	public static ApiPickException PICK_TITLE_TOO_LONG() {
		return new ApiPickException(ApiPickErrorCode.PICK_TITLE_TOO_LONG);
	}
}