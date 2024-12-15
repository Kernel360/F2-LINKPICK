package baguni.core.exception.base;

import baguni.core.util.CachedHttpServletRequest;

public abstract class ApiException extends RuntimeException {

	private final ApiErrorCode errorCode;

	protected ApiException(ApiErrorCode errorCode) {
		super(errorCode.toString());
		this.errorCode = errorCode;
	}

	public final ApiErrorCode getApiErrorCode() {
		return errorCode;
	}

	/**
	 * @author minkyeu kim
	 * - 아래처럼 하면 복잡하게 CachedHttpRequest가 필요 없을 것 같다.
	 *
	 * 예외가 발생한 지점인 ExceptionHandler에서 request를 출력하는 방식으로 변경하고
	 * 아래와 같이 간단하게 request를 String로 변환해서 출력하면 되지 않을지?
	 *
	 * ```
	 * @ExceptionHandler({ApiException.class})
	 * public Response foo(HttpServletRequest request, ApiException exception) {
	 *     log.info(IOUtils.toString(request.getReader()));
	 *     ... 나머지 코드 ...
	 *     return Response;
	 * }
	 *
	 * ```
	 */
	public final void handleErrorByLevel(CachedHttpServletRequest request) {
		errorCode.getErrorLevel().handleError(this, request);
	}
}
