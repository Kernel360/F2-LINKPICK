package techpick.core.exception.base;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import techpick.core.exception.level.ErrorLevel;

@RestControllerAdvice
@Slf4j
public class ApiExceptionHandler {

	/**
	 * ApiException 에서 잡지 못한 예외는
	 * 5xx 코드 오류 입니다.
	 */
	@ExceptionHandler(Exception.class)
	public ApiErrorResponse handleGlobalException(Exception exception) {

		ErrorLevel.MUST_NEVER_HAPPEN().handleError(exception);

		return ApiErrorResponse.UNKNOWN_SERVER_ERROR();
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ApiErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
		ErrorLevel.SHOULD_NOT_HAPPEN().handleError(exception);
		return ApiErrorResponse.VALIDATION_ERROR();
	}

	/**
	 * ApiException 을 공통 Response 형태로 변환 합니다.
	 */
	@ExceptionHandler(ApiException.class)
	public ApiErrorResponse handleApiException(ApiException exception) {

		exception.handleErrorByLevel();

		return ApiErrorResponse.of(exception.getApiErrorCode());
	}
}
