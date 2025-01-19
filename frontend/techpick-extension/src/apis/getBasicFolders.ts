import { API_URLS } from '@/constants/apiUrls';
import type { GetBasicFolderListType } from '@/types/GetBasicFolderListType';
import { returnErrorFromHTTPError } from '@/utils/returnErrorFromHTTPError';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';

export const getBasicFolderList = async () => {
  try {
    const response = await apiClient.get<GetBasicFolderListType>(
      API_URLS.getBasicsFolderUrl(),
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
