package baguni.common.exception.base;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import baguni.common.exception.level.FatalErrorLevel;
import baguni.common.util.ErrorLogEventBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import baguni.common.exception.level.ErrorLevel;
import baguni.common.util.RequestHolder;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ApiExceptionHandler {

	private final RequestHolder requestHolder;
	private final ErrorLogEventBuilder errorLogEventBuilder;

	/**
	 * ApiException 에서 잡지 못한 예외는
	 * 5xx 코드 오류 입니다.
	 */
	@ExceptionHandler(Exception.class)
	public ApiErrorResponse handleGlobalException(Exception exception) {
		ErrorLevel.MUST_NEVER_HAPPEN().handleError(exception, requestHolder.getRequest());
		errorLogEventBuilder.sendSlackMessage(exception, HttpStatus.INTERNAL_SERVER_ERROR);
		return ApiErrorResponse.UNKNOWN_SERVER_ERROR();
	}

	/**
	 * ApiException 을 공통 Response 형태로 변환 합니다.
	 */
	@ExceptionHandler(ApiException.class)
	public ApiErrorResponse handleApiException(ApiException exception) {
		ApiErrorCode apiErrorCode = exception.getApiErrorCode();
		ErrorLevel errorLevel = apiErrorCode.getErrorLevel();
		if (errorLevel instanceof FatalErrorLevel) {
			errorLogEventBuilder.sendSlackMessage(exception, apiErrorCode.getHttpStatus());
		}

		exception.handleErrorByLevel(requestHolder.getRequest());
		return ApiErrorResponse.of(apiErrorCode);
	}

	/**
	 * Validation 관련 예외
	 */
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ApiErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
		ErrorLevel.SHOULD_NOT_HAPPEN().handleError(exception, requestHolder.getRequest());
		return ApiErrorResponse.VALIDATION_ERROR(exception.getBindingResult().getFieldError().getDefaultMessage());
	}

	/**
	 * Json 파싱 과정 중 에러가 났을때 처리하는 handler
	 * 참고 : https://be-student.tistory.com/52
	 */
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ApiErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException exception) {
		ErrorLevel.SHOULD_NOT_HAPPEN().handleError(exception, requestHolder.getRequest());
		return ApiErrorResponse.INVALID_JSON_ERROR();
	}

	/**
	 * Request Parameter 가 있어야 하는데 없는 경우를 처리하는 handler
	 */
	@ExceptionHandler(MissingServletRequestParameterException.class)
	public ApiErrorResponse handleMissingServletRequestParameterException(
		MissingServletRequestParameterException exception) {
		ErrorLevel.SHOULD_NOT_HAPPEN().handleError(exception, requestHolder.getRequest());
		return ApiErrorResponse.INVALID_REQUEST_PARAMETER();
	}
}
