import { returnErrorFromHTTPError } from '@/utils';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';
import { API_URLS } from '@/constants';
import type { GetBasicFolderListType } from '@/types';

export const getBasicFolderList = async () => {
  try {
    const response = await apiClient.get<GetBasicFolderListType>(
      API_URLS.getBasicsFolderUrl()
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
