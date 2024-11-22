import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { getTagList, createTag, deleteTag, updateTag } from '@/apis/tag';
import { hasIndex } from '@/utils';
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
  updateTag: (updatedTagInfo: UpdateTagRequestType) => Promise<void>;
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
  selectedTagList: [],
  fetchingTagState: { isError: false, isPending: false, data: [] },
};

export const useTagStore = create<TagState & TagAction>()(
  immer((set, get) => ({
    ...initialState,

    replaceSelectedTagList: (tagList) =>
      set((state) => {
        state.selectedTagList = tagList;
      }),

    selectTag: (tag) =>
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
          (tag) => tag.id !== tagId
        );
      }),

    updateSelectedTagList: (updatedTag) => {
      set((state) => {
        const index = state.selectedTagList.findIndex(
          (tag) => tag.id === updatedTag.id
        );

        if (!hasIndex(index)) {
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
      } catch {
        set((state) => {
          state.fetchingTagState.isPending = false;
          state.fetchingTagState.isError = true;
        });
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
      } catch {
        /* empty */
      }
    },

    deleteTag: async (tagId: number) => {
      const deleteTargetTagIndex = get().tagList.findIndex(
        (tag) => tag.id === tagId
      );
      const deleteTargetSelectedIndex = get().selectedTagList.findIndex(
        (tag) => tag.id === tagId
      );

      if (!hasIndex(deleteTargetTagIndex)) {
        return;
      }

      const deleteTagInfo = get().tagList[deleteTargetTagIndex];

      set((state) => {
        state.tagList.splice(deleteTargetTagIndex, 1);

        if (hasIndex(deleteTargetSelectedIndex)) {
          state.selectedTagList.splice(deleteTargetSelectedIndex, 1);
        }
      });

      try {
        await deleteTag({ id: tagId });
      } catch {
        set((state) => {
          state.tagList.splice(deleteTargetTagIndex, 0, deleteTagInfo);

          if (hasIndex(deleteTargetSelectedIndex)) {
            state.selectedTagList.splice(
              deleteTargetSelectedIndex,
              0,
              deleteTagInfo
            );
          }
        });
      }
    },

    updateTag: async (updateTagInfo) => {
      const updateTagIndexInTagList = get().tagList.findIndex(
        (tag) => tag.id === updateTagInfo.id
      );
      const updateTagIndexInSelectedTagList = get().selectedTagList.findIndex(
        (tag) => tag.id === updateTagInfo.id
      );

      if (!hasIndex(updateTagIndexInTagList)) {
        return;
      }

      const previousTagInfo = get().tagList[updateTagIndexInTagList];

      try {
        set((state) => {
          state.tagList[updateTagIndexInTagList] = updateTagInfo;

          if (hasIndex(updateTagIndexInSelectedTagList)) {
            state.selectedTagList[updateTagIndexInSelectedTagList] =
              updateTagInfo;
          }
        });

        await updateTag(updateTagInfo);
      } catch {
        set((state) => {
          state.tagList[updateTagIndexInTagList] = previousTagInfo;

          if (hasIndex(updateTagIndexInSelectedTagList)) {
            state.selectedTagList[updateTagIndexInSelectedTagList] =
              previousTagInfo;
          }
        });
      }
    },
    findTagByName: (name) => get().tagList.filter((tag) => tag.name === name),
    findTagById: (id) => get().tagList.find((tag) => tag.id === id),
  }))
);
