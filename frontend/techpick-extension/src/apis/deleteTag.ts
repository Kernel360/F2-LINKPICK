import { API_URLS } from '@/constants/apiUrls';
import type { DeleteTagRequestType } from '@/types/DeleteTagRequestType';
import { returnErrorFromHTTPError } from '@/utils/returnErrorFromHTTPError';
import { HTTPError } from 'ky';
import { apiClient } from './apiClient';

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
