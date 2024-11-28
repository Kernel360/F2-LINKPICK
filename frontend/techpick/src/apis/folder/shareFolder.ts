import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import { ShareFolderRequestType, ShareFolderResponseType } from '@/types';

export const shareFolder = async (shareFolderInfo: ShareFolderRequestType) => {
  try {
    const response = await apiClient.post<ShareFolderResponseType>(
      API_URLS.SHARE_FOLDER,
      {
        json: shareFolderInfo,
      }
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
