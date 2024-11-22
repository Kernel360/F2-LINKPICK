import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import { CreatePickRequestType, CreatePickResponseType } from '@/types';

export const createPick = async (pickInfo: CreatePickRequestType) => {
  try {
    const response = await apiClient.post<CreatePickResponseType>(
      API_URLS.CREATE_PICKS,
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
