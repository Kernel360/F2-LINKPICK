import type { CreateTagRequestType } from '@/types/CreateTagRequestType';
import type { CreateTagResponseType } from '@/types/CreateTagResponseType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const createTag = async (createTag: CreateTagRequestType) => {
  try {
    const response = await apiClient.post<CreateTagResponseType>(
      API_URLS.CREATE_TAGS,
      {
        json: createTag,
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
