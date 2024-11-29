package techpick.api.domain.sharedFolder.exception;

import techpick.core.exception.base.ApiErrorCode;
import techpick.core.exception.base.ApiException;

public class ApiSharedFolderException extends ApiException {

    private ApiSharedFolderException(ApiErrorCode errorCode) {
        super(errorCode);
    }

    public static ApiSharedFolderException SHARED_FOLDER_NOT_FOUND() {
        return new ApiSharedFolderException(ApiSharedFolderErrorCode.SHARED_FOLDER_NOT_FOUND);
    }

    public static ApiSharedFolderException SHARED_FOLDER_UNAUTHORIZED() {
        return new ApiSharedFolderException(ApiSharedFolderErrorCode.SHARED_FOLDER_UNAUTHORIZED);
    }

    public static ApiSharedFolderException FOLDER_CANNOT_BE_SHARED() {
        return new ApiSharedFolderException(ApiSharedFolderErrorCode.FOLDER_CANT_BE_SHARED);
    }
}
