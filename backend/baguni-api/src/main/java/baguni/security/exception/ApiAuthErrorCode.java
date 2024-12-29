package baguni.security.exception;

import org.springframework.http.HttpStatus;

import baguni.core.exception.base.ApiErrorCode;
import baguni.core.exception.level.ErrorLevel;

public enum ApiAuthErrorCode implements ApiErrorCode {

	/**
	 * Auth Error Code (AU)
	 */
	AUTH_SOCIAL_TYPE_INVALID
		("AU-000", HttpStatus.UNAUTHORIZED, "지원하지 않는 소셜 타입으로 로그인 시도 - 개발자 확인 필요", ErrorLevel.MUST_NEVER_HAPPEN()),

	AUTH_INVALID_AUTHENTICATION
		("AU-001", HttpStatus.UNAUTHORIZED, "유효하지 않는 인증 정보", ErrorLevel.CAN_HAPPEN()),

	AUTH_TOKEN_ATTRIBUTE_NOT_FOUND
		("AU-002", HttpStatus.UNAUTHORIZED, "인증 처리를 위한 필수 필드가 토큰에 없음", ErrorLevel.SHOULD_NOT_HAPPEN()),

	AUTH_USER_MANDATORY_FOLDER_CREATE_FAILED
		("AU-003", HttpStatus.SERVICE_UNAVAILABLE, "회원 가입 과정 에서 사용자 필수 폴더 생성 실패", ErrorLevel.MUST_NEVER_HAPPEN()),
	;

	// ------------------------------------------------------------
	// 하단 코드는 모든 ApiErrorCode 들에 반드시 포함되야 합니다.
	// 새로운 ErrorCode 구현시 복사 붙여넣기 해주세요.

	private final String code;

	private final HttpStatus httpStatus;

	private final String errorMessage;

	private final ErrorLevel errorLevel;

	ApiAuthErrorCode(String code, HttpStatus status, String message, ErrorLevel errorLevel) {
		this.code = code;
		this.httpStatus = status;
		this.errorMessage = message;
		this.errorLevel = errorLevel;
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
		return this.errorLevel;
	}

	@Override
	public String toString() {
		return convertCodeToString(this);
	}
}
