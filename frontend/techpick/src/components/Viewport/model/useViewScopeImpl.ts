import { create } from 'zustand';
import { ViewScope } from './useViewScope';
/**
 * TODO: 현재는 링크 및 사용자 검색을 지원하지 않지만, 추후 확장 될 예정입니다.
 */
export const useViewScope = create<ViewScope>((set) => ({
  folderIds: [], // 폴더 id로 검색 <포커스 기능과 함께 사용>

  pickContents: [], // 픽의 제목, 메모 내용으로 검색

  tagIds: [], // 태그 id로 검색

  resetFolderIds: (folders) => set({ folderIds: folders }),

  resetPickContents: (contents) => set({ pickContents: contents }),

  resetTagIds: (tags) => set({ tagIds: tags }),

  resetAll: (folderIds, tagIds, pickContents) =>
    set({
      folderIds: folderIds ?? [],
      tagIds: tagIds ?? [],
      pickContents: pickContents ?? [],
    }),
}));
