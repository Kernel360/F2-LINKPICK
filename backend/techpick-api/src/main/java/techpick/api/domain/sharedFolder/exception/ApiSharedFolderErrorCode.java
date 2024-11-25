package techpick.api.domain.sharedFolder.exception;

import org.springframework.http.HttpStatus;

import techpick.core.exception.base.ApiErrorCode;
import techpick.core.exception.level.ErrorLevel;

public enum ApiSharedFolderErrorCode implements ApiErrorCode {

	/**
	 * Pick Error Code (PK)
	 */
	SHARED_FOLDER_NOT_FOUND
		("SF-000", HttpStatus.NOT_FOUND, "존재하지 않는 SharedFolder", ErrorLevel.CAN_HAPPEN()),
	SHARED_FOLDER_UNAUTHORIZED
		("SF-001", HttpStatus.UNAUTHORIZED, "잘못된 SharedFolder 접근, 다른 사용자의 SharedFolder에 접근",
			ErrorLevel.SHOULD_NOT_HAPPEN()),
	;

	private final String code;

	private final HttpStatus httpStatus;

	private final String errorMessage;

	private final ErrorLevel logLevel;

	ApiSharedFolderErrorCode(String code, HttpStatus status, String message, ErrorLevel errorLevel) {
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
