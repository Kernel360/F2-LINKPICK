import { API_URLS } from '@/constants/apiUrls';
import type { UpdatePickFromExtensionRequestType } from '@/types/UpdatePickFromExtensionRequestType';
import type { UpdatePickFromExtensionResponseType } from '@/types/UpdatePickFromExtensionResponseType';
import { returnErrorFromHTTPError } from '@/utils/returnErrorFromHTTPError';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';

export const updatePickFromExtension = async (
  pickInfo: UpdatePickFromExtensionRequestType,
) => {
  try {
    const response = await apiClient.patch<UpdatePickFromExtensionResponseType>(
      API_URLS.getExtensionPickUrl(),
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
