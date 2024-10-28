package kernel360.techpick.api.domain.folder.exception;

import org.springframework.http.HttpStatus;

import kernel360.techpick.core.exception.base.ApiErrorCode;
import kernel360.techpick.core.exception.level.ErrorLevel;

public enum ApiFolderErrorCode implements ApiErrorCode {

	/**
	 * Folder Error Code (FO)
	 */
	FOLDER_NOT_FOUND
		("FO-000", HttpStatus.BAD_REQUEST, "존재하지 않는 폴더", ErrorLevel.SHOULD_NOT_HAPPEN()),
	FOLDER_ALREADY_EXIST
		("FO-001", HttpStatus.BAD_REQUEST, "이미 존재하는 폴더 이름", ErrorLevel.CAN_HAPPEN()),
	FOLDER_ACCESS_DENIED
		("FO-002", HttpStatus.FORBIDDEN, "접근할 수 없는 폴더", ErrorLevel.SHOULD_NOT_HAPPEN()),
	BASIC_FOLDER_CANNOT_CHANGED
		("FO-003", HttpStatus.BAD_REQUEST, "기본폴더는 변경(수정/삭제/이동)할 수 없음", ErrorLevel.MUST_NEVER_HAPPEN()),
	CANNOT_DELETE_FOLDER_NOT_IN_RECYCLE_BIN
		("FO-004", HttpStatus.BAD_REQUEST, "휴지통 안에 있는 폴더만 삭제할 수 있음", ErrorLevel.MUST_NEVER_HAPPEN()),
	INVALID_FOLDER_TYPE
		("F0-005", HttpStatus.NOT_IMPLEMENTED, "미구현 폴더 타입에 대한 서비스 요청", ErrorLevel.MUST_NEVER_HAPPEN()),
	BASIC_FOLDER_ALREADY_EXISTS
		("F0-006", HttpStatus.NOT_ACCEPTABLE, "기본 폴더는 1개만 존재할 수 있음.", ErrorLevel.MUST_NEVER_HAPPEN()),
	INVALID_MOVE_TARGET
		("F0-007", HttpStatus.NOT_ACCEPTABLE, "이동하려는 폴더들의 범위가 올바르지 않음", ErrorLevel.SHOULD_NOT_HAPPEN()),
	;

	private final String code;

	private final HttpStatus httpStatus;

	private final String errorMessage;

	private final ErrorLevel errorLevel;

	ApiFolderErrorCode(String code, HttpStatus status, String message, ErrorLevel errorLevel) {
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
}
