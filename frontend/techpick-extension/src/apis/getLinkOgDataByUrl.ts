import { HTTPError } from 'ky';
import { apiClient } from './apiClient';
import { API_URLS } from '@/constants';
import { returnErrorFromHTTPError } from '@/utils';
import { GetOgTagDataResponseType } from '@/types';

export const getOgDataByUrl = async (url: string) => {
  try {
    const response = await apiClient.get<GetOgTagDataResponseType>(
      API_URLS.getLinkOGData(encodeURIComponent(url))
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
