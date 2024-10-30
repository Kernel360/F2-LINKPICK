package techpick.core.exception.base;

import org.springframework.http.HttpStatus;

import techpick.core.exception.level.ErrorLevel;

public interface ApiErrorCode {

	String getCode();

	String getMessage();

	HttpStatus getHttpStatus();

	ErrorLevel getErrorLevel();

	default String convertCodeToString(ApiErrorCode errorCode) {
		return String.format("[ 에러 코드 %s : %s ]", errorCode.getCode(), errorCode.getMessage());
	}
}
