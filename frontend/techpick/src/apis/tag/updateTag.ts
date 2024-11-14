import { apiClient } from '@/apis';
import { UpdateTagRequestType, UpdateTagResponseType } from '@/types';

// const findTargetTag = (
//   tagList: UpdateTagResponseType,
//   updateTag: TagUpdateType
// ) => {
//   const targetTag = tagList.filter((tag) => tag.tagId === updateTag.tagId);
//   return targetTag;
// };

export const updateTag = async (updateTag: UpdateTagRequestType) => {
  const response = await apiClient.put<UpdateTagResponseType>('tag', {
    json: [updateTag],
  });
  const updatedTag = await response.json();
  //const updatedTag = findTargetTag(totalTagList, updateTag);

  return updatedTag;
};
