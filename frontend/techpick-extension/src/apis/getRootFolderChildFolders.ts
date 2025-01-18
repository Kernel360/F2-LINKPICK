import { API_URLS } from '@/constants/apiUrls';
import type { GetRootFolderChildFoldersResponseType } from '@/types/GetRootFolderChildFoldersResponseType';
import { returnErrorFromHTTPError } from '@/utils/returnErrorFromHTTPError';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';

export const getRootFolderChildFolders = async () => {
  try {
    const response = await apiClient.get<GetRootFolderChildFoldersResponseType>(
      API_URLS.getFoldersUrl(),
    );
    const data = await response.json();
    return data;
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
