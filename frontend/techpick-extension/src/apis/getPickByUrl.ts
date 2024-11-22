import { apiClient } from './apiClient';
import type { GetPickByUrlResponseType } from '@/types';
import { API_URLS } from '@/constants';
import { HTTPError } from 'ky';
import { returnErrorFromHTTPError } from '@/utils';

export const getPickByUrl = async (url: string) => {
  try {
    const response = await apiClient.get<GetPickByUrlResponseType>(
      API_URLS.getPicksByLinkUrl(encodeURIComponent(url))
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
