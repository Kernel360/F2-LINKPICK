import { apiClient } from './apiClient';
import { CreateTagRequestType, CreateTagResponseType } from '@/types';
import { API_URLS } from '@/constants';
import { HTTPError } from 'ky';
import { returnErrorFromHTTPError } from '@/utils';

export const createTag = async (createTag: CreateTagRequestType) => {
  try {
    const response = await apiClient.post<CreateTagResponseType>(
      API_URLS.getTagsUrl(),
      { json: createTag }
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
