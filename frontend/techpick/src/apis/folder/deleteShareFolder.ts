import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';

export const deleteMyShareFolder = async (sourceFolderId: number) => {
  try {
    const res = await apiClient.delete(
      API_URLS.DELETE_SHARED_FOLER_BY_FOLDER_ID(sourceFolderId)
    );
    return res.ok;
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
