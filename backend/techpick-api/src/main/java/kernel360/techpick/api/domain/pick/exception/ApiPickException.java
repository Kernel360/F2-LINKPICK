package kernel360.techpick.api.domain.pick.exception;

import kernel360.techpick.core.exception.base.ApiErrorCode;
import kernel360.techpick.core.exception.base.ApiException;

public class ApiPickException extends ApiException {

	private ApiPickException(ApiErrorCode errorCode) {
		super(errorCode);
	}

	public static ApiPickException PICK_NOT_FOUND() {
		throw new ApiPickException(ApiPickErrorCode.PICK_NOT_FOUND);
	}

	public static ApiPickException PICK_MUST_BE_UNIQUE_FOR_A_URL() {
		throw new ApiPickException(ApiPickErrorCode.PICK_ALREADY_EXIST);
	}

	public static ApiPickException PICK_UNAUTHORIZED_ACCESS() {
		throw new ApiPickException(ApiPickErrorCode.PICK_UNAUTHORIZED_ACCESS);
	}
}
