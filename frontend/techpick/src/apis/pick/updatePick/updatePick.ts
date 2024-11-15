import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import type {
  GetPickResponseType,
  UpdatePickRequestType,
} from '../pickApi.type';

export const updatePick = async (pickInfo: UpdatePickRequestType) => {
  try {
    const response = await apiClient.put<GetPickResponseType>('picks', {
      json: pickInfo,
    });
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
