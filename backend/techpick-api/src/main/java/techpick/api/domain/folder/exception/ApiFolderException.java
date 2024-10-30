package techpick.api.domain.folder.exception;

import techpick.core.exception.base.ApiErrorCode;
import techpick.core.exception.base.ApiException;

public class ApiFolderException extends ApiException {

	private ApiFolderException(ApiErrorCode errorCode) {
		super(errorCode);
	}

	/**
	 * TODO: Implement static factory method
	 */
	public static ApiFolderException FOLDER_NOT_FOUND() {
		return new ApiFolderException(ApiFolderErrorCode.FOLDER_NOT_FOUND);
	}

	public static ApiFolderException FOLDER_ALREADY_EXIST() {
		return new ApiFolderException(ApiFolderErrorCode.FOLDER_ALREADY_EXIST);
	}

	public static ApiFolderException FOLDER_ACCESS_DENIED() {
		return new ApiFolderException(ApiFolderErrorCode.FOLDER_ACCESS_DENIED);
	}

	public static ApiFolderException BASIC_FOLDER_CANNOT_CHANGED() {
		return new ApiFolderException(ApiFolderErrorCode.BASIC_FOLDER_CANNOT_CHANGED);
	}

	public static ApiFolderException CANNOT_DELETE_FOLDER_NOT_IN_RECYCLE_BIN() {
		return new ApiFolderException(ApiFolderErrorCode.CANNOT_DELETE_FOLDER_NOT_IN_RECYCLE_BIN);
	}

	public static ApiFolderException INVALID_FOLDER_TYPE() {
		return new ApiFolderException(ApiFolderErrorCode.INVALID_FOLDER_TYPE);
	}

	public static ApiFolderException BASIC_FOLDER_ALREADY_EXISTS() {
		return new ApiFolderException(ApiFolderErrorCode.BASIC_FOLDER_ALREADY_EXISTS);
	}

	public static ApiFolderException INVALID_MOVE_TARGET() {
		return new ApiFolderException(ApiFolderErrorCode.INVALID_MOVE_TARGET);
	}
}
