import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import type { MoveFolderRequestType } from '@/types';

export const moveFolder = async (moveFolderInfo: MoveFolderRequestType) => {
  try {
    await apiClient.patch(API_URLS.MOVE_FOLDER, { json: moveFolderInfo });

    return;
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
