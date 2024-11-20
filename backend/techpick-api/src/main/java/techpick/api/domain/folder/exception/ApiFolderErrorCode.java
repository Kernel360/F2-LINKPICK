package techpick.api.domain.folder.exception;

import org.springframework.http.HttpStatus;

import techpick.core.exception.base.ApiErrorCode;
import techpick.core.exception.level.ErrorLevel;

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
		("FO-005", HttpStatus.NOT_IMPLEMENTED, "미구현 폴더 타입에 대한 서비스 요청", ErrorLevel.MUST_NEVER_HAPPEN()),
	BASIC_FOLDER_ALREADY_EXISTS
		("FO-006", HttpStatus.NOT_ACCEPTABLE, "기본 폴더는 1개만 존재할 수 있음", ErrorLevel.MUST_NEVER_HAPPEN()),
	INVALID_TARGET
		("FO-007", HttpStatus.NOT_ACCEPTABLE, "휴지통 또는 미분류 폴더에 폴더를 (생성/이동)할 수 없음", ErrorLevel.SHOULD_NOT_HAPPEN()),
	INVALID_PARENT_FOLDER
		("FO-008", HttpStatus.NOT_ACCEPTABLE, "부모 폴더가 올바르지 않음", ErrorLevel.SHOULD_NOT_HAPPEN()),
	// TODO: folder depth 추가 시 예외 삭제 예정
	ROOT_FOLDER_SEARCH_NOT_ALLOWED
		("FO-009", HttpStatus.NOT_ACCEPTABLE, "루트 폴더에 대한 검색은 허용되지 않음", ErrorLevel.SHOULD_NOT_HAPPEN()),
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
