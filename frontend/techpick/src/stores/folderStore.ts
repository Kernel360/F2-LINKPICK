import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { FolderAction, FolderState } from './folderStore.type';

const initialState: FolderState = {
  selectedFolderList: [],
  isDragging: false,

  draggingFolderInfo: null,
};

export const useFolderStore = create<FolderState & FolderAction>()(
  subscribeWithSelector(
    immer((set) => ({
      ...initialState,

      setSelectedFolderList: (newSelectedFolderData) => {
        set((state) => {
          state.selectedFolderList = newSelectedFolderData;
        });
      },
      setIsDragging: (isDragging) => {
        set((state) => {
          state.isDragging = isDragging; // 드래그 상태 설정
        });
      },
      setDraggingFolderInfo: (draggingFolderInfo) => {
        set((state) => {
          state.draggingFolderInfo = draggingFolderInfo;
        });
      },
    })),
  ),
);
