import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import { UploadBookmarkResponseType } from '@/types';

export const uploadBookmark = async (formData: FormData) => {
  try {
    const response = await apiClient.post<UploadBookmarkResponseType>(
      API_URLS.UPLOAD_BOOKMARK,
      { body: formData }
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
