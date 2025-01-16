import type { TagType } from '@/types';

export const findTagById = (id: number, tagList: TagType[]) => {
  return tagList.find((tag) => tag.id === id);
};
