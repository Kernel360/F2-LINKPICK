import { HTTPError } from 'ky';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { handleHTTPError } from '@/apis';
import { getTagList, createTag, deleteTag, updateTag } from '@/apis/tag';
import type {
  TagType,
  CreateTagRequestType,
  UpdateTagRequestType,
} from '@/types';

type TagState = {
  tagList: TagType[];
  selectedTagList: TagType[];
  fetchingTagState: {
    isError: boolean;
    isPending: boolean;
    data: TagType[];
  };
};

type TagAction = {
  replaceSelectedTagList: (tagList: TagType[]) => void;
  selectTag: (tag: TagType) => void;
  deselectTag: (tagId: TagType['id']) => void;
  updateSelectedTagList: (tag: TagType) => void;
  fetchingTagList: () => Promise<void>;
  createTag: (tagData: CreateTagRequestType) => Promise<TagType | undefined>;
  deleteTag: (tagId: TagType['id']) => Promise<void>;
  updateTag: (updatedTag: UpdateTagRequestType) => Promise<void>;
};

const initialState: TagState = {
  tagList: [],
  selectedTagList: [],
  fetchingTagState: { isError: false, isPending: false, data: [] },
};

export const useTagStore = create<TagState & TagAction>()(
  immer((set) => ({
    ...initialState,

    replaceSelectedTagList: (tagList) =>
      set((state) => {
        state.selectedTagList = tagList;
      }),

    selectTag: (tag: TagType) =>
      set((state) => {
        const exist = state.selectedTagList.some((t) => t.id === tag.id);

        // 이미 선택된 태그인지 확인
        if (exist) {
          return;
        }

        state.selectedTagList.push(tag);
      }),

    deselectTag: (tagId) =>
      set((state) => {
        state.selectedTagList = state.selectedTagList.filter(
          (t) => t.id !== tagId
        );
      }),

    updateSelectedTagList: (updatedTag) => {
      set((state) => {
        const index = state.selectedTagList.findIndex(
          (tag) => tag.id === updatedTag.id
        );

        if (index === -1) {
          return;
        }

        state.selectedTagList[index] = {
          ...updatedTag,
        };
      });
    },

    fetchingTagList: async () => {
      try {
        set((state) => {
          state.fetchingTagState.isPending = true;
        });

        const remoteTagList = await getTagList();

        set((state) => {
          state.tagList = [...remoteTagList];
          state.fetchingTagState.isPending = false;
        });
      } catch (error) {
        if (error instanceof HTTPError) {
          set((state) => {
            state.fetchingTagState.isPending = false;
            state.fetchingTagState.isError = true;
          });

          if (error instanceof HTTPError) {
            await handleHTTPError(error);
          }
        }
      }

      return;
    },

    createTag: async (tagData) => {
      try {
        const newTag = await createTag(tagData);

        set((state) => {
          state.tagList.push(newTag);
        });

        return newTag;
      } catch (error) {
        if (error instanceof HTTPError) {
          await handleHTTPError(error);
        }
      }
    },

    deleteTag: async (tagId: number) => {
      let temporalDeleteTargetTag: TagType | undefined;
      let deleteTargetTagIndex = -1;
      let isSelected = false;
      let deleteTargetSelectedIndex = -1;

      try {
        set((state) => {
          deleteTargetTagIndex = state.tagList.findIndex(
            (tag) => tag.id === tagId
          );
          deleteTargetSelectedIndex = state.selectedTagList.findIndex(
            (tag) => tag.id === tagId
          );

          if (deleteTargetTagIndex !== -1) {
            temporalDeleteTargetTag = {
              ...state.tagList[deleteTargetTagIndex],
            };
            state.tagList.splice(deleteTargetTagIndex, 1);
          }

          if (deleteTargetSelectedIndex !== -1) {
            isSelected = true;
            state.selectedTagList.splice(deleteTargetSelectedIndex, 1);
          }
        });

        await deleteTag(tagId);
      } catch (error) {
        set((state) => {
          if (!temporalDeleteTargetTag) {
            return;
          }

          state.tagList.splice(
            deleteTargetTagIndex,
            0,
            temporalDeleteTargetTag
          );

          if (isSelected) {
            state.selectedTagList.splice(
              deleteTargetSelectedIndex,
              0,
              temporalDeleteTargetTag
            );
          }
        });

        if (error instanceof HTTPError) {
          await handleHTTPError(error);
        }
      }
    },

    updateTag: async (updatedTag) => {
      let previousTag: TagType | undefined;
      let previousSelectedTag: TagType | undefined;

      try {
        set((state) => {
          const index = state.tagList.findIndex(
            (tag) => tag.id === updatedTag.id
          );

          if (index !== -1) {
            previousTag = { ...state.tagList[index] };

            state.tagList[index] = updatedTag;
          }

          const selectedTagListIndex = state.selectedTagList.findIndex(
            (tag) => tag.id === updatedTag.id
          );

          if (selectedTagListIndex !== -1) {
            previousSelectedTag = {
              ...state.selectedTagList[selectedTagListIndex],
            };
            state.selectedTagList[selectedTagListIndex] = updatedTag;
          }
        });

        await updateTag(updatedTag);
      } catch (error) {
        set((state) => {
          if (previousTag) {
            const index = state.tagList.findIndex(
              (tag) => tag.id === previousTag?.id
            );
            state.tagList[index] = previousTag;
          }

          if (previousSelectedTag) {
            const selectedIndex = state.selectedTagList.findIndex(
              (tag) => tag.id === previousSelectedTag?.id
            );
            state.selectedTagList[selectedIndex] = previousSelectedTag;
          }
        });

        if (error instanceof HTTPError) {
          await handleHTTPError(error);
        }
      }
    },
  }))
);
