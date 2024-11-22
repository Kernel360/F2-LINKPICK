import { API_URLS } from '@/constants';
import { apiClient } from './apiClient';
import type { UpdatePickRequestType, UpdatePickResponseType } from '@/types';
import { HTTPError } from 'ky';
import { returnErrorFromHTTPError } from '@/utils';

export const updatePick = async (pickInfo: UpdatePickRequestType) => {
  try {
    const response = await apiClient.patch<UpdatePickResponseType>(
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
