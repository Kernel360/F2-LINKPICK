import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { ViewAction, ViewState } from './useViewScope.type';

/**
 * TODO: 현재는 링크 및 사용자 검색을 지원하지 않지만, 추후 확장 될 예정입니다.
 */
const initialState: ViewState = {
  folderIds: [], // 폴더 id로 검색 <포커스 기능과 함께 사용>
  pickContents: [], // 픽의 제목, 메모 내용으로 검색
  tagIds: [], // 태그 id로 검색
};

export const useViewScope = create<ViewState & ViewAction>()(
  immer((set) => ({
    ...initialState,
    resetFolderIds: (folders: number[]) =>
      set((state) => {
        state.folderIds = folders;
      }),
    resetPickContents: (contents: string[]) =>
      set((state) => {
        state.pickContents = contents;
      }),
    resetTagIds: (tags: number[]) =>
      set((state) => {
        state.tagIds = tags;
      }),
  }))
);
