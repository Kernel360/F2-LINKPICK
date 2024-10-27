import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { hasIndex } from '@/utils';
import type { Active, Over } from '@dnd-kit/core';
import type { FolderType } from '@/types';

export type SelectedFolderListType = number[];

type MoveFolderPayload = {
  from: Active;
  to: Over;
  selectedFolderList: SelectedFolderListType;
};

type TreeState = {
  treeDataList: FolderType[];
  selectedFolderList: SelectedFolderListType;
  from: Active | null;
  to: Over | null;
  isDragging: boolean;
};

type TreeAction = {
  createFolder: () => void;
  readFolder: () => void;
  updateFolder: () => void;
  deleteFolder: () => void;
  moveFolder: ({ from, to, selectedFolderList }: MoveFolderPayload) => void;
  focusFolder: () => void;
  movePick: () => void;
  setTreeData: (newTreeDate: FolderType[]) => void;
  setSelectedFolderList: (
    newSelectedFolderData: SelectedFolderListType
  ) => void;
  setFrom: (newFrom: Active) => void;
  setTo: (newTo: Over) => void;
  setIsDragging: (isDragging: boolean) => void;
};

const initialState: TreeState = {
  treeDataList: [],
  selectedFolderList: [],
  from: null,
  to: null,
  isDragging: false,
};

export const useTreeStore = create<TreeState & TreeAction>()(
  immer((set) => ({
    ...initialState,
    createFolder: () => {},
    readFolder: () => {},
    updateFolder: () => {},
    deleteFolder: () => {},
    moveFolder: ({ from, to, selectedFolderList }) => {
      set((state) => {
        const curIndex = state.treeDataList.findIndex(
          (item) => item.id === from.id
        );
        const targetIndex = state.treeDataList.findIndex(
          (item) => item.id === to.id
        );
        // 이동할 폴더가 (즉 목적지 to)가 뒤에 있다면 위치를 조정해야한다.
        const nextIndex =
          curIndex < targetIndex
            ? Math.min(targetIndex + 1, state.treeDataList.length)
            : targetIndex;

        if (!hasIndex(curIndex) || !hasIndex(nextIndex)) return;

        // 이동할 폴더 리스트를 생성합니다.
        const folderListToMove = state.treeDataList.filter((treeData) => {
          return selectedFolderList.includes(treeData.id);
        });

        // nextIndex 이전의 리스트, selected list, nextIndex after index
        const beforeNextIndexList = state.treeDataList
          .slice(0, nextIndex)
          .filter((treeData) => {
            return !selectedFolderList.includes(treeData.id);
          });
        const afterNextIndexList = state.treeDataList
          .slice(nextIndex)
          .filter((treeData) => {
            return !selectedFolderList.includes(treeData.id);
          });

        // 새 리스트를 만들어 상태를 업데이트합니다.
        state.treeDataList = [
          ...beforeNextIndexList,
          ...folderListToMove,
          ...afterNextIndexList,
        ];
      });
    },

    focusFolder: () => {},
    movePick: () => {},
    setTreeData: (newTreeDate) => {
      set((state) => {
        state.treeDataList = newTreeDate;
      });
    },
    setSelectedFolderList: (newSelectedFolderData) => {
      set((state) => {
        state.selectedFolderList = newSelectedFolderData;
      });
    },
    setFrom: (newFrom) => {
      set((state) => {
        state.from = newFrom;
      });
    },
    setTo: (newTo) => {
      set((state) => {
        state.to = newTo;
      });
    },
    setIsDragging: (isDragging) => {
      set((state) => {
        state.isDragging = isDragging; // 드래그 상태 설정
      });
    },
  }))
);
