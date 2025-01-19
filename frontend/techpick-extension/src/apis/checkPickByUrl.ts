import { API_URLS } from '@/constants/apiUrls';
import type { GetPickByUrlResponseType } from '@/types/GetPickByUrlResponseType';
import { returnErrorFromHTTPError } from '@/utils/returnErrorFromHTTPError';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';

export const checkPickByUrl = async (url: string) => {
  try {
    const response = await apiClient.get<GetPickByUrlResponseType>(
      API_URLS.getPicksByLinkUrl(encodeURIComponent(url)),
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
