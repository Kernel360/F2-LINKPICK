import { apiClient } from '@/apis';
import { DeleteTagRequestType } from '@/types';

export const deleteTag = async (tagId: DeleteTagRequestType['id']) => {
  const deleteTagRequest: DeleteTagRequestType = {
    id: tagId,
  };

  await apiClient.delete<never>(`tags`, {
    json: deleteTagRequest,
  });
};
