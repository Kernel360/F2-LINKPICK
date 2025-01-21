import { UNKNOWN_FOLDER_ID } from '@/constants/unknownFolderId';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { TreeAction, TreeState } from './folderStore.type';

const initialState: TreeState = {
  selectedFolderList: [],
  focusFolderId: null,
  rootFolderId: UNKNOWN_FOLDER_ID,
  hoverFolderId: null,
  isDragging: false,
  draggingFolderInfo: null,
  isShareFolder: false,
};

export const useTreeStore = create<TreeState & TreeAction>()(
  subscribeWithSelector(
    immer((set) => ({
      ...initialState,

      selectSingleFolder: (folderId) => {
        set((state) => {
          state.focusFolderId = folderId;
          state.selectedFolderList = [folderId];
        });
      },
      setFocusFolderId: (newFolderId) => {
        set((state) => {
          state.focusFolderId = newFolderId;
        });
      },

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
      setHoverFolderId: (hoverFolderId) => {
        set((state) => {
          state.hoverFolderId = hoverFolderId;
        });
      },
    })),
  ),
);
