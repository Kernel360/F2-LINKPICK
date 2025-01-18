import { API_URLS } from '@/constants/apiUrls';
import type { UpdateTagRequestType } from '@/types/UpdateTagRequestType';
import { returnErrorFromHTTPError } from '@/utils/returnErrorFromHTTPError';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';

export const updateTag = async (updateTagInfo: UpdateTagRequestType) => {
  try {
    await apiClient.patch(API_URLS.getTagsUrl(), {
      json: updateTagInfo,
    });
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);

      throw error;
    }
    throw httpError;
  }
};
