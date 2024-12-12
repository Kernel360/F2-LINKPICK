package techpick.ranking.exception;

import org.springframework.http.HttpStatus;

import techpick.core.exception.base.ApiErrorCode;
import techpick.core.exception.level.ErrorLevel;

public enum ApiRankErrorCode implements ApiErrorCode {

	/**
	 * Rank Error Code (R)
	 */
	INVALID_DATE_RANGE
		("R-000", HttpStatus.NOT_FOUND, "순위 조회 날짜가 잘못되었습니다.", ErrorLevel.SHOULD_NOT_HAPPEN()),
	;
	// ------------------------------------------------------------
	// 하단 코드는 모든 ApiErrorCode 들에 반드시 포함되야 합니다.
	// 새로운 ErrorCode 구현시 복사 붙여넣기 해주세요.

	private final String code;

	private final HttpStatus httpStatus;

	private final String errorMessage;

	private final ErrorLevel errorLevel;

	ApiRankErrorCode(String code, HttpStatus status, String message, ErrorLevel errorLevel) {
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
