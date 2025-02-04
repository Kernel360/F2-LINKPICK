import { API_URLS } from '@/constants/apiUrls';
import type { CreatePickRequestType } from '@/types/CreatePickRequestType';
import type { CreatePickResponseType } from '@/types/CreatePickResponseType';
import { returnErrorFromHTTPError } from '@/utils/returnErrorFromHTTPError';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';

export const createPick = async (createPickInfo: CreatePickRequestType) => {
  try {
    await apiClient.post<CreatePickResponseType>(API_URLS.getCreatePickUrl(), {
      json: createPickInfo,
    });
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
