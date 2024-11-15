import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import type {
  CreateFolderRequestType,
  CreateFolderResponseType,
} from '@/types';

export const createFolder = async (newFolderInfo: CreateFolderRequestType) => {
  try {
    const response = await apiClient.post<CreateFolderResponseType>(
      API_URLS.CREATE_FOLDER,
      { json: newFolderInfo }
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
