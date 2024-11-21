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

  fetchingTagState: {
    isError: boolean;
    isPending: boolean;
    data: TagType[];
  };
};

type TagAction = {
  fetchingTagList: () => Promise<void>;
  createTag: (tagData: CreateTagRequestType) => Promise<TagType | undefined>;
  deleteTag: (tagId: TagType['id']) => Promise<void>;
  updateTag: (updatedTag: UpdateTagRequestType) => Promise<void>;
  /**
   * TODO: 익스텐션과 앱이 중복되는 Store를 가지고 있는데 이 부분 해결 필요.
   * @author 김민규
   * @description 미리 로딩한 나의 태그 리스트 정보에서 찾는다.
   * @return {TagType[]} 찾지 못한 경우 빈 배열 반환
   * */
  findTagByName: (name: string) => TagType[];
  findTagById: (id: number) => TagType | undefined;
};

const initialState: TagState = {
  tagList: [],

  fetchingTagState: { isError: false, isPending: false, data: [] },
};

export const useTagStore = create<TagState & TagAction>()(
  immer((set, get) => ({
    ...initialState,

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

      try {
        set((state) => {
          deleteTargetTagIndex = state.tagList.findIndex(
            (tag) => tag.id === tagId
          );

          if (deleteTargetTagIndex !== -1) {
            temporalDeleteTargetTag = {
              ...state.tagList[deleteTargetTagIndex],
            };
            state.tagList.splice(deleteTargetTagIndex, 1);
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
        });

        if (error instanceof HTTPError) {
          await handleHTTPError(error);
        }
      }
    },

    updateTag: async (updatedTag) => {
      let previousTag: TagType | undefined;

      try {
        set((state) => {
          const index = state.tagList.findIndex(
            (tag) => tag.id === updatedTag.id
          );

          if (index !== -1) {
            previousTag = { ...state.tagList[index] };

            state.tagList[index] = updatedTag;
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
        });

        if (error instanceof HTTPError) {
          await handleHTTPError(error);
        }
      }
    },
    findTagByName: (name) => get().tagList.filter((tag) => tag.name === name),
    findTagById: (id) => get().tagList.find((tag) => tag.id === id),
  }))
);
