import type { MoveFolderRequestType } from '@/types/MoveFolderRequestType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

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
