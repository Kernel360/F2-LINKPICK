import type { FolderIdType } from '@/types/FolderIdType';
import type { GetPicksResponseType } from '@/types/GetPicksResponseType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const getPickListByFolderId = async (folderId: FolderIdType) => {
  try {
    const response = await apiClient.get<GetPicksResponseType>(
      API_URLS.GET_PICKS_BY_FOLDER_ID(folderId),
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
