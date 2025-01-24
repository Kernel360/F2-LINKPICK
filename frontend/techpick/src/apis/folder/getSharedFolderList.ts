import type { GetShareFolderListResponseType } from '@/types/GetShareFolderListResponseType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const getSharedFolderList = async () => {
  try {
    const response = await apiClient.get<GetShareFolderListResponseType>(
      API_URLS.GET_SHARE_FOLDER,
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
