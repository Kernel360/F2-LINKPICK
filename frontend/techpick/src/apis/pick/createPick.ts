import type { CreatePickRequestType } from '@/types/CreatePickRequestType';
import type { CreatePickResponseType } from '@/types/CreatePickResponseType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const createPick = async (pickInfo: CreatePickRequestType) => {
  try {
    const response = await apiClient.post<CreatePickResponseType>(
      API_URLS.CREATE_PICKS,
      {
        json: pickInfo,
      },
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
