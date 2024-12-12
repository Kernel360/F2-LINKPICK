package baguni.ranking.exception;

import baguni.core.exception.base.ApiErrorCode;
import baguni.core.exception.base.ApiException;

public class ApiRankException extends ApiException {

	private ApiRankException(ApiErrorCode errorCode) {
		super(errorCode);
	}

	/**
	 * TODO: Implement static factory method
	 */
	public static ApiRankException INVALID_DATE_RANGE() {
		return new ApiRankException(ApiRankErrorCode.INVALID_DATE_RANGE);
	}
}
