package baguni.api.service.user.exception;

import baguni.common.exception.base.ApiErrorCode;
import baguni.common.exception.base.ApiException;

public class ApiUserException extends ApiException {

	private ApiUserException(ApiErrorCode errorCode) {
		super(errorCode);
	}

	/**
	 * TODO: Implement static factory method
	 * */
	public static ApiUserException USER_NOT_FOUND() {
		return new ApiUserException(ApiUserErrorCode.USER_NOT_FOUND);
	}

	public static ApiUserException USER_CREATE_FAILURE() {
		return new ApiUserException(ApiUserErrorCode.USER_CREATE_FAILURE);
	}
}
