import { API_URLS } from '@/constants';
import { returnErrorFromHTTPError } from '@/utils';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';

import type {
  CreatePickToUnclassifiedFolderRequestType,
  CreatePickToUnclassifiedFolderResponseType,
} from '@/types';
export const createPickToUnclassifiedFolder = async (
  createPickInfo: CreatePickToUnclassifiedFolderRequestType
) => {
  try {
    const response =
      await apiClient.post<CreatePickToUnclassifiedFolderResponseType>(
        API_URLS.getExtensionPickUrl(),
        {
          json: createPickInfo,
        }
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
