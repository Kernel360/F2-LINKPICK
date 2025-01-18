import { API_URLS } from '@/constants/apiUrls';
import type { CreateTagRequestType } from '@/types/CreateTagRequestType';
import type { CreateTagResponseType } from '@/types/CreateTagResponseType';
import { returnErrorFromHTTPError } from '@/utils/returnErrorFromHTTPError';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';

export const createTag = async (createTag: CreateTagRequestType) => {
  try {
    const response = await apiClient.post<CreateTagResponseType>(
      API_URLS.getTagsUrl(),

      { json: createTag },
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
