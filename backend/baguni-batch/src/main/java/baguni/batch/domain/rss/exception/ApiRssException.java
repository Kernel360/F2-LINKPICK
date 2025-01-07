package baguni.batch.domain.rss.exception;

import baguni.common.exception.base.ApiErrorCode;
import baguni.common.exception.base.ApiException;

public class ApiRssException extends ApiException {

	private ApiRssException(ApiErrorCode errorCode) {
		super(errorCode);
	}

	public static ApiRssException RSS_NOT_FOUND() {
		return new ApiRssException(ApiRssErrorCode.RSS_NOT_FOUND);
	}

}
