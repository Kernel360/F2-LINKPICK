package baguni.batch.domain.rss.exception;

import baguni.core.exception.base.ApiErrorCode;
import baguni.core.exception.base.ApiException;

public class ApiRssException extends ApiException {

	private ApiRssException(ApiErrorCode errorCode) {
		super(errorCode);
	}

	public static ApiRssException RSS_NOT_FOUND() {
		return new ApiRssException(ApiRssErrorCode.RSS_NOT_FOUND);
	}

}