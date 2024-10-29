import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { hasIndex } from '@/utils';
import { isDnDCurrentData } from './dndTreeStore.util';
import type { Active, Over, UniqueIdentifier } from '@dnd-kit/core';
import type { FolderType, FolderMapType } from '@/types';

export type SelectedFolderListType = number[];

type MoveFolderPayload = {
  from: Active;
  to: Over;
  selectedFolderList: SelectedFolderListType;
};

type TreeState = {
  treeDataMap: FolderMapType;
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
  setTreeMap: (newTreeDate: FolderMapType) => void;
  setSelectedFolderList: (
    newSelectedFolderData: SelectedFolderListType
  ) => void;
  setFrom: (newFrom: Active) => void;
  setTo: (newTo: Over) => void;
  setIsDragging: (isDragging: boolean) => void;
  filterByParentId: (parentId: UniqueIdentifier) => FolderType[];
};

const initialState: TreeState = {
  treeDataMap: {},
  selectedFolderList: [],
  from: null,
  to: null,
  isDragging: false,
};

export const useTreeStore = create<TreeState & TreeAction>()(
  immer((set, get) => ({
    ...initialState,
    createFolder: () => {},
    readFolder: () => {},
    updateFolder: () => {},
    deleteFolder: () => {},
    moveFolder: ({ from, to, selectedFolderList }) => {
      const fromData = from.data.current;
      const toData = to.data.current;

      if (!isDnDCurrentData(fromData) || !isDnDCurrentData(toData)) {
        return;
      }

      // SortableContext에 id가 없으면 종료
      if (!fromData.sortable.containerId || !toData.sortable.containerId) {
        return;
      }

      // 일단 containerId가 다르면 동작 X containerId는 parentId
      if (fromData.sortable.containerId !== toData.sortable.containerId) {
        return;
      }

      const parentId = fromData.sortable.containerId;

      set((state) => {
        const treeData = state.treeDataMap[parentId];
        const { childFolderList } = treeData;
        const curIndex = childFolderList.findIndex((item) => item === from.id);
        const targetIndex = childFolderList.findIndex((item) => item === to.id);

        // 이동할 폴더가 (즉 목적지 to)가 뒤에 있다면 위치를 조정해야한다.
        const nextIndex =
          curIndex < targetIndex
            ? Math.min(targetIndex + 1, childFolderList.length)
            : targetIndex;
        if (!hasIndex(curIndex) || !hasIndex(nextIndex)) return;

        // nextIndex 이전의 리스트, selected list, nextIndex after index
        const beforeNextIndexList = childFolderList
          .slice(0, nextIndex)
          .filter((index) => !selectedFolderList.includes(index));
        const afterNextIndexList = childFolderList
          .slice(nextIndex)
          .filter((index) => !selectedFolderList.includes(index));

        // 새 리스트를 만들어 상태를 업데이트합니다.
        state.treeDataMap[parentId].childFolderList = [
          ...beforeNextIndexList,
          ...selectedFolderList,
          ...afterNextIndexList,
        ];
      });
    },

    focusFolder: () => {},
    movePick: () => {},
    setTreeMap: (newTreeDate) => {
      set((state) => {
        state.treeDataMap = newTreeDate;
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
    filterByParentId: (parentId) => {
      const parentFolder = get().treeDataMap[parentId.toString()];

      if (!parentFolder) {
        return [];
      }

      const childFolderIdList = parentFolder.childFolderList;
      const filteredFolderList = [];

      for (const childFolderId of childFolderIdList) {
        const curFolderInfo = get().treeDataMap[childFolderId];

        if (!curFolderInfo) {
          continue;
        }

        filteredFolderList.push(curFolderInfo);
      }

      return filteredFolderList;
    },
  }))
);
