import type { TagType } from '@/types/TagType';
import { findTagById } from './findTagById';

export const getFilteredSelectedTagList = ({
  selectedTagIdList,
  tagList,
}: {
  selectedTagIdList: number[];
  tagList: TagType[];
}) => {
  const filteredSelectedTagList: TagType[] = [];

  for (const tagId of selectedTagIdList) {
    const tagInfo = findTagById(tagId, tagList);
    if (tagInfo) {
      filteredSelectedTagList.push(tagInfo);
    }
  }

  return filteredSelectedTagList;
};
