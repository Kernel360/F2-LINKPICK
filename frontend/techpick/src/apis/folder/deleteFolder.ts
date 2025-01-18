import type { DeleteFolderRequestType } from '@/types/DeleteFolderRequestType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const deleteFolder = async (
  deleteFolderList: DeleteFolderRequestType['idList'],
) => {
  try {
    await apiClient.delete(API_URLS.DELETE_FOLDER, {
      json: { idList: deleteFolderList },
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
