import { API_URLS } from '@/constants/apiUrls';
import type { GetTagListResponseType } from '@/types/GetTagListResponseType';
import { returnErrorFromHTTPError } from '@/utils/returnErrorFromHTTPError';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';

export const getTagList = async () => {
  try {
    const response = await apiClient.get<GetTagListResponseType>(
      API_URLS.getTagsUrl(),
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
