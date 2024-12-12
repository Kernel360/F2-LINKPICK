package baguni.api.domain.sharedFolder.exception;

import org.springframework.http.HttpStatus;

import baguni.core.exception.base.ApiErrorCode;
import baguni.core.exception.level.ErrorLevel;

public enum ApiSharedFolderErrorCode implements ApiErrorCode {

	/**
	 * Pick Error Code (PK)
	 */
	SHARED_FOLDER_NOT_FOUND
		("SF-000", HttpStatus.NOT_FOUND, "존재하지 않는 SharedFolder", ErrorLevel.CAN_HAPPEN()),
	SHARED_FOLDER_UNAUTHORIZED
		("SF-001", HttpStatus.UNAUTHORIZED, "잘못된 SharedFolder 접근, 다른 사용자의 SharedFolder에 접근",
			ErrorLevel.SHOULD_NOT_HAPPEN()),
	FOLDER_CANT_BE_SHARED
		("SF-002", HttpStatus.UNAUTHORIZED, "해당 폴더는 공유될 수 없는 폴더입니다!",
			ErrorLevel.MUST_NEVER_HAPPEN()),
	FOLDER_ALREADY_SHARED
		("SF-003", HttpStatus.CONFLICT, "이미 공유된 폴더는 다시 공유 상태가 될 수 없습니다.",
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
