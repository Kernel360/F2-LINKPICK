package baguni.security.exception;

import org.springframework.http.HttpStatus;

import baguni.common.exception.base.ErrorCode;
import baguni.common.exception.level.ErrorLevel;

public class AuthErrorCode extends ErrorCode {

	/**
	 * Auth Error Code (AU)
	 */
	public static final ErrorCode AUTH_SOCIAL_TYPE_INVALID = new AuthErrorCode(
		"AU-000", HttpStatus.UNAUTHORIZED, "지원하지 않는 소셜 타입으로 로그인 시도 - 개발자 확인 필요", ErrorLevel.MUST_NEVER_HAPPEN()
	);
	public static final ErrorCode AUTH_INVALID_AUTHENTICATION = new AuthErrorCode(
		"AU-001", HttpStatus.UNAUTHORIZED, "유효하지 않는 인증 정보", ErrorLevel.CAN_HAPPEN()
	);
	public static final ErrorCode AUTH_TOKEN_ATTRIBUTE_NOT_FOUND = new AuthErrorCode(
		"AU-002", HttpStatus.UNAUTHORIZED, "인증 처리를 위한 필수 필드가 토큰에 없음", ErrorLevel.SHOULD_NOT_HAPPEN()
	);
	public static final ErrorCode AUTH_SERVER_FAILURE = new AuthErrorCode(
		"AU-003", HttpStatus.SERVICE_UNAVAILABLE, "인증 처리 과정에 서버 오류가 발생했습니다! 개발자 문의 필요", ErrorLevel.MUST_NEVER_HAPPEN()
	);
	public static final ErrorCode AUTH_INVALID_ID_TOKEN = new AuthErrorCode(
		"AU-004", HttpStatus.UNAUTHORIZED, "사용자 식별 토큰 (ID TOKEN)이 유효한 값이 아닙니다.", ErrorLevel.MUST_NEVER_HAPPEN()
	);

	AuthErrorCode(String code, HttpStatus status, String message, ErrorLevel errorLevel) {
		super(code, status, message, errorLevel);
	}
}
