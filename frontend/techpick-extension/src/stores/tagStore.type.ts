import { CreateTagRequestType, TagType, UpdateTagRequestType } from '@/types';

export type TagState = {
  tagList: TagType[];
  selectedTagList: TagType[];
  fetchingTagState: { isError: boolean; isPending: boolean; data: TagType[] };
};

export type TagAction = {
  replaceSelectedTagList: (tagList: TagType[]) => void;
  selectTag: (tag: TagType) => void;
  deselectTag: (tagId: TagType['id']) => void;
  updateSelectedTagList: (tag: TagType) => void;
  fetchingTagList: () => Promise<void>;
  createTag: (tagData: CreateTagRequestType) => Promise<TagType | undefined>;
  deleteTag: (tagId: TagType['id']) => Promise<void>;
  updateTag: (updatedTagInfo: UpdateTagRequestType) => Promise<void>;
  popSelectedTag: () => void;
};
