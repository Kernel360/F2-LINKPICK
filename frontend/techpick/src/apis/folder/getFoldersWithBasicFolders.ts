import type { GetFoldersWithBasicFoldersResponseType } from '@/types/GetFoldersWithBasicFoldersResponseType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const getFoldersWithBasicFolders = async () => {
  try {
    const response =
      await apiClient.get<GetFoldersWithBasicFoldersResponseType>(
        API_URLS.GET_FOLDERS_WITH_BASIC_FOLDERS,
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
