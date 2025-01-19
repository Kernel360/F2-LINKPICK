import type { CreateFolderRequestType } from '@/types/CreateFolderRequestType';
import type { CreateFolderResponseType } from '@/types/CreateFolderResponseType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const createFolder = async (newFolderInfo: CreateFolderRequestType) => {
  try {
    const response = await apiClient.post<CreateFolderResponseType>(
      API_URLS.CREATE_FOLDER,
      { json: newFolderInfo },
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
