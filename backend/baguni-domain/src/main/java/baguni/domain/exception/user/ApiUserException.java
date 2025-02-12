package baguni.domain.exception.user;

import baguni.common.exception.base.ApiErrorCode;
import baguni.common.exception.base.ApiException;

public class ApiUserException extends ApiException {

	private String message;

	private ApiUserException(ApiErrorCode errorCode) {
		super(errorCode);
	}

	private ApiUserException(ApiErrorCode errorCode, String message) {
		super(errorCode);
		this.message = message;
	}

	@Override
	public String getMessage() {
		return String.format("%s : %s", message, super.getMessage());
	}

	/**
	 * TODO: Implement static factory method
	 * */
	public static ApiUserException USER_NOT_FOUND() {
		return new ApiUserException(ApiUserErrorCode.USER_NOT_FOUND);
	}

	public static ApiUserException USER_NOT_FOUND(String message) {
		return new ApiUserException(ApiUserErrorCode.USER_NOT_FOUND, message);
	}
}
