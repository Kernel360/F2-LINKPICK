import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import type { UpdatePickRequestType, PickInfoType } from '@/types';

export const updatePick = async (pickInfo: UpdatePickRequestType) => {
  try {
    const response = await apiClient.patch<PickInfoType>(
      API_URLS.UPDATE_PICKS,
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
