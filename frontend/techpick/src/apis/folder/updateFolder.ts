import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import type { UpdateFolderRequestType } from '@/types';

export const updateFolder = async (
  updateFolderInfo: UpdateFolderRequestType
) => {
  try {
    await apiClient.patch(API_URLS.UPDATE_FOLDER, {
      json: updateFolderInfo,
    });

    return;
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
