import type { TagType } from '@/types/TagType';

export const findTagById = (id: number, tagList: TagType[]) => {
  return tagList.find((tag) => tag.id === id);
};
