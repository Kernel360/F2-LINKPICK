import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import { GetMyShareFolderResponseType } from '@/types';

export const getMySharedFolders = async () => {
  try {
    const response = await apiClient.get<GetMyShareFolderResponseType[]>(
      API_URLS.SHARE_FOLDER
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
