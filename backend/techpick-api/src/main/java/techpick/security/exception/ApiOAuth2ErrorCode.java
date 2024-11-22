package techpick.security.exception;

import org.springframework.http.HttpStatus;

import techpick.core.exception.base.ApiErrorCode;
import techpick.core.exception.level.ErrorLevel;

public enum ApiOAuth2ErrorCode implements ApiErrorCode {

	/**
	 * OAuth2 Error Code (OA)
	 * */
	SOCIAL_TYPE_INVALID
		("OA-000", HttpStatus.BAD_REQUEST, "올바르지 않은 소셜 타입", ErrorLevel.MUST_NEVER_HAPPEN()),
	INVALID_AUTHENTICATION("OA-001", HttpStatus.FORBIDDEN, "잘못된 인증정보", ErrorLevel.SHOULD_NOT_HAPPEN()),
	;

	// ------------------------------------------------------------
	// 하단 코드는 모든 ApiErrorCode 들에 반드시 포함되야 합니다.
	// 새로운 ErrorCode 구현시 복사 붙여넣기 해주세요.

	private final String code;

	private final HttpStatus httpStatus;

	private final String errorMessage;

	private final ErrorLevel logLevel;

	ApiOAuth2ErrorCode(String code, HttpStatus status, String message, ErrorLevel errorLevel) {
		this.code = code;
		this.httpStatus = status;
		this.errorMessage = message;
		this.logLevel = errorLevel;
	}

	@Override
	public String getCode() {
		return this.code;
	}

	@Override
	public String getMessage() {
		return this.errorMessage;
	}

	@Override
	public HttpStatus getHttpStatus() {
		return this.httpStatus;
	}

	@Override
	public ErrorLevel getErrorLevel() {
		return this.logLevel;
	}

	@Override
	public String toString() {
		return convertCodeToString(this);

	}
}