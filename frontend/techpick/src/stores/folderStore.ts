import type { FolderType } from '@/types/FolderType';
import { moveFoldersToDifferentParentFolder } from '@/utils/moveFoldersDifferentParentFolder';
import { moveFoldersToSameParentFolder } from '@/utils/moveFoldersToSameParentFolder';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { FolderAction, FolderState } from './folderStore.type';

const initialState: FolderState = {
  folderRecord: {},
  selectedFolderList: [],
  isDragging: false,
  draggingFolderInfo: null,
};

export const useFolderStore = create<FolderState & FolderAction>()(
  subscribeWithSelector(
    immer((set, get) => ({
      ...initialState,
      setFolderRecord: (newFolderRecord) => {
        set((state) => {
          state.folderRecord = newFolderRecord;
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
      moveFolder: ({
        fromId,
        destinationFolderId,
        toId,
        idList,
        parentFolderId,
      }) => {
        set((state) => {
          const folderRecord = state.folderRecord;

          // 부모 폴더가 같을 때.
          if (
            parentFolderId === destinationFolderId &&
            folderRecord[parentFolderId]
          ) {
            moveFoldersToSameParentFolder({
              fromId,
              idList,
              nextFolders: folderRecord,
              parentFolderId,
              toId,
            });
          }

          // 부모 폴더가 다를때.
          if (
            parentFolderId !== destinationFolderId &&
            folderRecord[parentFolderId] &&
            folderRecord[destinationFolderId]
          ) {
            moveFoldersToDifferentParentFolder({
              destinationFolderId,
              idList,
              nextFolders: folderRecord,
              parentFolderId,
              toId,
            });
          }
        });
      },
      getChildFolderListByParentFolderId: (folderId) => {
        const folderRecord = get().folderRecord;

        const childFolderIdOrderedList = folderRecord?.[folderId]
          ? folderRecord[folderId].childFolderIdOrderedList
          : [];
        const childFolderList: FolderType[] = [];

        for (const childFolderId of childFolderIdOrderedList) {
          if (folderRecord?.[childFolderId]) {
            childFolderList.push(folderRecord[childFolderId]);
          }
        }

        return childFolderList;
      },
    })),
  ),
);
