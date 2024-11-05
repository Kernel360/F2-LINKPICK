import { apiClient } from '@/apis';
import { DeleteTagRequestType } from '@/types';

export const deleteTag = async (tagId: DeleteTagRequestType['tagId']) => {
  const deleteTagRequest: DeleteTagRequestType = {
    tagId,
  };

  await apiClient.delete<never>(`tags`, {
    json: deleteTagRequest,
  });
};
