package baguni.domain.exception.link;

import baguni.common.exception.base.ApiErrorCode;
import baguni.common.exception.base.ApiException;

public class ApiLinkException extends ApiException {

	private ApiLinkException(ApiErrorCode errorCode) {
		super(errorCode);
	}

	/**
	 * TODO: Implement static factory method
	 */
	public static ApiLinkException LINK_NOT_FOUND() {
		return new ApiLinkException(ApiLinkErrorCode.LINK_NOT_FOUND);
	}

	public static ApiLinkException LINK_ANALYZE_FAILURE() {
		return new ApiLinkException(ApiLinkErrorCode.LINK_ANALYZE_FAILURE);
	}

	public static ApiLinkException LINK_URL_TOO_LONG() {
		return new ApiLinkException(ApiLinkErrorCode.LINK_URL_TOO_LONG);
	}
}
