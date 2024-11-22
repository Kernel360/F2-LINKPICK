import { apiClient } from './apiClient';
import type { GetTagListResponseType } from '@/types';
import { API_URLS } from '@/constants';
import { HTTPError } from 'ky';
import { returnErrorFromHTTPError } from '@/utils';

export const getTagList = async () => {
  try {
    const response = await apiClient.get<GetTagListResponseType>(
      API_URLS.getTagsUrl()
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
