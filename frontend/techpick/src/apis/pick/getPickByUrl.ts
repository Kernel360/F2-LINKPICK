import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';
import { GetPickByUrlResponseType } from '@/types';

export const getPickByUrl = async (url: string) => {
  try {
    const response = await apiClient.get<GetPickByUrlResponseType>(
      API_URLS.GET_PICK_BY_URL(encodeURIComponent(url))
    );
    return await response.json();
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
