package techpick.core.exception.base;

import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import techpick.core.exception.level.ErrorLevel;
import techpick.core.util.RequestHolder;

@RestControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class ApiExceptionHandler {

	private final RequestHolder requestHolder;

	/**
	 * ApiException 에서 잡지 못한 예외는
	 * 5xx 코드 오류 입니다.
	 */
	@ExceptionHandler(Exception.class)
	public ApiErrorResponse handleGlobalException(Exception exception) {

		ErrorLevel.MUST_NEVER_HAPPEN().handleError(exception, requestHolder.getRequest());

		return ApiErrorResponse.UNKNOWN_SERVER_ERROR();
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ApiErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
		ErrorLevel.SHOULD_NOT_HAPPEN().handleError(exception, requestHolder.getRequest());
		return ApiErrorResponse.VALIDATION_ERROR();
	}

	/**
	 * ApiException 을 공통 Response 형태로 변환 합니다.
	 */
	@ExceptionHandler(ApiException.class)
	public ApiErrorResponse handleApiException(ApiException exception) {

		exception.handleErrorByLevel(requestHolder.getRequest());

		return ApiErrorResponse.of(exception.getApiErrorCode());
	}

	// Json 파싱 과정 중 에러가 났을때 처리하는 handler
	// 참고 : https://be-student.tistory.com/52
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ApiErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException exception) {
		ErrorLevel.SHOULD_NOT_HAPPEN().handleError(exception, requestHolder.getRequest());
		return ApiErrorResponse.INVALID_JSON_ERROR();
	}
}
