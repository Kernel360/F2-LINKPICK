import type { DeleteTagRequestType } from '@/types/DeleteTagRequestType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const deleteTag = async (tagId: DeleteTagRequestType['id']) => {
  try {
    const deleteTagRequest: DeleteTagRequestType = {
      id: tagId,
    };

    await apiClient.delete<never>(API_URLS.DELETE_TAGS, {
      json: deleteTagRequest,
    });
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
