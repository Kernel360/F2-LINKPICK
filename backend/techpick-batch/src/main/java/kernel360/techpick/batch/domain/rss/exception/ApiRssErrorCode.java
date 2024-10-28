package kernel360.techpick.batch.domain.rss.exception;

import org.springframework.http.HttpStatus;

import kernel360.techpick.core.exception.base.ApiErrorCode;
import kernel360.techpick.core.exception.level.ErrorLevel;

public enum ApiRssErrorCode implements ApiErrorCode {

	/**
	 * Rss Error Code (RS)
	 */
	RSS_NOT_FOUND("RS-000", HttpStatus.NOT_FOUND, "RSS 피드 렌더링 오류 또는 RSS 지원하지 않는 사이트", ErrorLevel.SHOULD_NOT_HAPPEN());

	// ------------------------------------------------------------
	// 하단 코드는 모든 ApiErrorCode 들에 반드시 포함되야 합니다.
	// 새로운 ErrorCode 구현시 복사 붙여넣기 해주세요.

	private final String code;

	private final HttpStatus httpStatus;

	private final String errorMessage;

	private final ErrorLevel errorLevel;

	ApiRssErrorCode(String code, HttpStatus status, String message, ErrorLevel errorLevel) {
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
	public String convertCodeToString(ApiErrorCode errorCode) {
		return ApiErrorCode.super.convertCodeToString(errorCode);
	}

	@Override
	public String toString() {
		return convertCodeToString(this);
	}
}
