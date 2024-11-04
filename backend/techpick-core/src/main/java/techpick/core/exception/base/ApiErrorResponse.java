package techpick.core.exception.base;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;

public class ApiErrorResponse extends ResponseEntity<ApiErrorBody> {

	private ApiErrorResponse(ApiErrorCode apiErrorCode) {
		super(
			new ApiErrorBody(apiErrorCode.getCode(), apiErrorCode.getMessage()),
			apiErrorCode.getHttpStatus()
		);
	}

	private ApiErrorResponse(String code, String message, HttpStatus status) {
		super(new ApiErrorBody(code, message), status);
	}

	public static ApiErrorResponse of(ApiErrorCode apiErrorCode) {
		return new ApiErrorResponse(apiErrorCode);
	}

	public static ApiErrorResponse VALIDATION_ERROR() {
		return new ApiErrorResponse("VALIDATION ERROR", "DTO @Valid 검증 에러, 잘못된 값 입력", HttpStatus.BAD_REQUEST);
	}

	public static ApiErrorResponse UNKNOWN_SERVER_ERROR() {
		return new ApiErrorResponse("UNKNOWN", "미확인 서버 에러", HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
