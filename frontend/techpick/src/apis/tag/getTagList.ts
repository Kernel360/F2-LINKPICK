import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';
import type { GetTagListResponseType } from '@/types';

export const getTagList = async () => {
  try {
    const response = await apiClient.get<GetTagListResponseType>(
      API_URLS.GET_TAGS
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
