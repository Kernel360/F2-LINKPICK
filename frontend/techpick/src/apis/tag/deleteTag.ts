import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { DeleteTagRequestType } from '@/types';

export const deleteTag = async (tagId: DeleteTagRequestType['id']) => {
  const deleteTagRequest: DeleteTagRequestType = {
    id: tagId,
  };

  await apiClient.delete<never>(API_URLS.DELETE_TAGS, {
    json: deleteTagRequest,
  });
};
