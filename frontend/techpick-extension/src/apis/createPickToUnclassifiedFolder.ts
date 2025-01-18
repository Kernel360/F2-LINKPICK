import { API_URLS } from '@/constants/apiUrls';
import type { CreatePickToUnclassifiedFolderRequestType } from '@/types/CreatePickToUnclassifiedFolderRequestType';
import type { CreatePickToUnclassifiedFolderResponseType } from '@/types/CreatePickToUnclassifiedFolderResponseType';
import { returnErrorFromHTTPError } from '@/utils/returnErrorFromHTTPError';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';

export const createPickToUnclassifiedFolder = async (
  createPickInfo: CreatePickToUnclassifiedFolderRequestType,
) => {
  try {
    const response =
      await apiClient.post<CreatePickToUnclassifiedFolderResponseType>(
        API_URLS.getExtensionPickUrl(),
        {
          json: createPickInfo,
        },
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
