import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { ShareFolderReadFolderFullResponseType } from '@/types/sharedFolder.type';
import { API_URLS } from '../apiConstants';

export const getShareFolderById = async (uuid: string) => {
  try {
    const response = await apiClient.get<ShareFolderReadFolderFullResponseType>(
      API_URLS.GET_SHARED_FOLER_BY_UUID(uuid)
    );

    return response.json();
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
