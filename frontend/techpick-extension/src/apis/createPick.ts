import { apiClient } from './apiClient';
import { CreatePickRequestType, CreatePickResponseType } from '@/types';
import { API_URLS } from '@/constants';
import { returnErrorFromHTTPError } from '@/utils';
import { HTTPError } from 'ky';

export const createPick = async (pickInfo: CreatePickRequestType) => {
  try {
    const response = await apiClient.post<CreatePickResponseType>(
      API_URLS.getPicksUrl(),
      {
        json: pickInfo,
      }
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
