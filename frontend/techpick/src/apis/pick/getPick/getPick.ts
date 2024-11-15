import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import type { GetPickResponseType } from '../pickApi.type';

export const getPick = async (pickId: number): Promise<GetPickResponseType> => {
  try {
    const response = await apiClient.get<GetPickResponseType>(
      `picks/${pickId}`
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
