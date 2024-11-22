import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';
import { DeleteTagRequestType } from '@/types';

export const deleteTag = async (deleteTagInfo: DeleteTagRequestType) => {
  try {
    await apiClient.delete<never>(API_URLS.DELETE_TAGS, {
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
