import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  ViewerStateAction,
  ViewerState,
  ViewerStateReader,
  ViewerStateWriter,
} from './useViewerState.type';

// Read Only Handler
export const useViewStateReader = (): ViewerStateReader => {
  const viewState = useViewerStateInternal();
  return {
    readFolderIds: () => viewState.folderIds,
    readPickContents: () => viewState.pickContents,
    readTagIds: () => viewState.tagIds,
  };
};

// Write Only Handler
export const useViewStateWriter = (): ViewerStateWriter => {
  const viewState = useViewerStateInternal();
  return {
    writeFolderIds: (folderIds: number[]) => viewState.setFolderIds(folderIds),
    writeTagIds: (tagIds: number[]) => viewState.setTagIds(tagIds),
    writePickContents: (contents: string[]) =>
      viewState.setPickContents(contents),
  };
};

const initialState: ViewerState = {
  folderIds: [], // 폴더 id로 검색 <포커스 기능과 함께 사용>
  pickContents: [], // 픽의 제목, 메모 내용으로 검색
  tagIds: [], // 태그 id로 검색
};

const useViewerStateInternal = create<ViewerState & ViewerStateAction>()(
  immer((set) => ({
    ...initialState,
    setFolderIds: (folders: number[]) =>
      set((state) => {
        state.folderIds = folders;
      }),
    setPickContents: (contents: string[]) =>
      set((state) => {
        state.pickContents = contents;
      }),
    setTagIds: (tags: number[]) =>
      set((state) => {
        state.tagIds = tags;
      }),
  }))
);
