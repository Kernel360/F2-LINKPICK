package baguni.common.exception.base;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ApiErrorResponse extends ResponseEntity<ApiErrorBody> {

	private ApiErrorResponse(ErrorCode errorCode) {
		super(
			new ApiErrorBody(errorCode.getCode(), errorCode.getClientMessage()),
			errorCode.getHttpStatus()
		);
	}

	public ApiErrorResponse(String code, String message, HttpStatus status) {
		super(new ApiErrorBody(code, message), status);
	}

	public static ApiErrorResponse fromErrorCode(ErrorCode errorCode) {
		return new ApiErrorResponse(errorCode);
	}
}
