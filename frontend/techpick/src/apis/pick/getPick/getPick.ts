import type { PickInfoType } from '@/types/PickInfoType';
import { HTTPError } from 'ky';
import { apiClient } from '../../apiClient';
import { returnErrorFromHTTPError } from '../../error';

export const getPick = async (pickId: number): Promise<PickInfoType> => {
  try {
    const response = await apiClient.get<PickInfoType>(`picks/${pickId}`);
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
