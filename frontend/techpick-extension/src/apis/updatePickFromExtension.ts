import { API_URLS } from '@/constants';
import { apiClient } from './apiClient';
import type {
  UpdatePickFromExtensionRequestType,
  UpdatePickFromExtensionResponseType,
} from '@/types';
import { HTTPError } from 'ky';
import { returnErrorFromHTTPError } from '@/utils';

export const updatePickFromExtension = async (
  pickInfo: UpdatePickFromExtensionRequestType
) => {
  try {
    const response = await apiClient.patch<UpdatePickFromExtensionResponseType>(
      API_URLS.getExtensionPickUrl(),
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
