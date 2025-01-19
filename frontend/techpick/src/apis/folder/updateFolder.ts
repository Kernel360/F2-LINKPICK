import type { UpdateFolderRequestType } from '@/types/UpdateFolderRequestType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const updateFolder = async (
  updateFolderInfo: UpdateFolderRequestType,
) => {
  try {
    await apiClient.patch(API_URLS.UPDATE_FOLDER, {
      json: updateFolderInfo,
    });

    return;
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
