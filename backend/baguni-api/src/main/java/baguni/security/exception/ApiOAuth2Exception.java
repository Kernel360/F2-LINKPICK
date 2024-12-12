package baguni.security.exception;

import baguni.core.exception.base.ApiErrorCode;
import baguni.core.exception.base.ApiException;

public class ApiOAuth2Exception extends ApiException {

	private ApiOAuth2Exception(ApiErrorCode errorCode) {
		super(errorCode);
	}

	/**
	 * TODO: Implement static factory method
	 * */
	public static ApiOAuth2Exception SOCIAL_TYPE_INVALID() {
		return new ApiOAuth2Exception(ApiOAuth2ErrorCode.SOCIAL_TYPE_INVALID);
	}

	public static ApiOAuth2Exception INVALID_AUTHENTICATION() {
		return new ApiOAuth2Exception(ApiOAuth2ErrorCode.INVALID_AUTHENTICATION);
	}
}