package baguni.common.exception.base;

import org.springframework.http.HttpStatus;

import baguni.common.exception.level.ErrorLevel;

public abstract class ErrorCode {

	/**
	 * 도메인 코드 + 에러 번호
	 * ex. 폴더 = F
	 */
	private final String code;

	/**
	 * TODO: 주석을 추가해서, exception의 message와 다르다는 점을 공지할 것.
	 */
	private final String clientMessage;

	private final HttpStatus httpStatus;

	private final ErrorLevel errorLevel;

	protected ErrorCode(String code, HttpStatus httpStatus, String clientMessage, ErrorLevel errorLevel) {
		this.code = code;
		this.httpStatus = httpStatus;
		this.clientMessage = clientMessage;
		this.errorLevel = errorLevel;
	}

	public String getCode() {
		return this.code;
	}

	public String getClientMessage() {
		return this.clientMessage;
	}

	public HttpStatus getHttpStatus() {
		return this.httpStatus;
	}

	public ErrorLevel getErrorLevel() {
		return this.errorLevel;
	}

	@Override
	public String toString() {
		return String.format("[ 에러 코드 %s : %s ]", this.code, this.clientMessage);
	}
}
