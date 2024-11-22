import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';
import { UpdateTagRequestType } from '@/types';

export const updateTag = async (updateTag: UpdateTagRequestType) => {
  try {
    await apiClient.patch(API_URLS.UPDATE_TAGS, {
      json: updateTag,
    });
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);

      throw error;
    }
    throw httpError;
  }
};
