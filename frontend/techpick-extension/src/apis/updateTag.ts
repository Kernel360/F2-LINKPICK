import { UpdateTagRequestType } from '@/types';
import { apiClient } from './apiClient';
import { API_URLS } from '@/constants';
import { HTTPError } from 'ky';
import { returnErrorFromHTTPError } from '@/utils';

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
