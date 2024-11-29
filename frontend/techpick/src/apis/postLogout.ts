import { HTTPError } from 'ky';
import { apiClient } from '@/apis/apiClient';
import { API_URLS } from './apiConstants';
import { returnErrorFromHTTPError } from './error';

export const postLogout = async () => {
  try {
    await apiClient.post(API_URLS.POST_LOGOUT);
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
