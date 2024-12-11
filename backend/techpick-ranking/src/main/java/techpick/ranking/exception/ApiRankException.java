package techpick.ranking.exception;

import techpick.core.exception.base.ApiErrorCode;
import techpick.core.exception.base.ApiException;

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
