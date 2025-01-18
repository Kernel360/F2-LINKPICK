import type { PickInfoType } from '@/types/PickInfoType';
import type { UpdatePickRequestType } from '@/types/UpdatePickRequestType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const updatePick = async (pickInfo: UpdatePickRequestType) => {
  try {
    const response = await apiClient.patch<PickInfoType>(
      API_URLS.UPDATE_PICKS,
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
