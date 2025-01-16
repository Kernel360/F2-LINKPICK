import { findTagById } from './findTagById';
import type { TagType } from '@/types';

export const getFilteredSelectedTagList = ({
  selectedTagIdList,
  tagList,
}: {
  selectedTagIdList: number[];
  tagList: TagType[];
}) => {
  const filteredSelectedTagList: TagType[] = [];

  selectedTagIdList.forEach((tagId) => {
    const tagInfo = findTagById(tagId, tagList);
    if (tagInfo) {
      filteredSelectedTagList.push(tagInfo);
    }
  });

  return filteredSelectedTagList;
};
