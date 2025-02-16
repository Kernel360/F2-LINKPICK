package baguni.common.exception.base;

import org.springframework.http.HttpStatus;

import baguni.common.exception.level.ErrorLevel;

public abstract class ErrorCode {

	/**
	 * 도메인 + 에러 번호 형식의 코드
	 * Ex. 첫번째 폴더 에러 코드 = FO-001
	 *     네번째 유저 에러 코드 = U-004
	 */
	private final String code;

	/**
	 * 해당 에러 코드의 의미 (= 설명)
	 */
	private final String explanation;

	private final HttpStatus httpStatus;

	private final ErrorLevel errorLevel;

	protected ErrorCode(String code, HttpStatus httpStatus, String explanation, ErrorLevel errorLevel) {
		this.code = code;
		this.httpStatus = httpStatus;
		this.explanation = explanation;
		this.errorLevel = errorLevel;
	}

	public String getCode() {
		return this.code;
	}

	public String getExplanation() {
		return this.explanation;
	}

	public HttpStatus getHttpStatus() {
		return this.httpStatus;
	}

	public ErrorLevel getErrorLevel() {
		return this.errorLevel;
	}

	@Override
	public String toString() {
		return String.format("[ 에러 코드 %s : %s ]", this.code, this.explanation);
	}
}
