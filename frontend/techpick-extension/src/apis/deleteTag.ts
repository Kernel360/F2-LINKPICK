import { apiClient } from './apiClient';
import { DeleteTagRequestType } from '@/types';
import { API_URLS } from '@/constants';
import { HTTPError } from 'ky';
import { returnErrorFromHTTPError } from '@/utils';

export const deleteTag = async (deleteTagInfo: DeleteTagRequestType) => {
  try {
    await apiClient.delete<never>(API_URLS.getTagsUrl(), {
      json: deleteTagInfo,
    });
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
