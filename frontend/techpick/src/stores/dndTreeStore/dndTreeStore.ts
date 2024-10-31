import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { changeParentFolderId } from './utils/changeParentFolderId';
import { isDnDCurrentData } from './utils/isDnDCurrentData';
import { moveFolderToDifferentParent } from './utils/moveFolderToDifferentParent';
import { reorderFolderInSameParent } from './utils/reorderFoldersInSameParent';
import type { Active, Over, UniqueIdentifier } from '@dnd-kit/core';
import type {
  FolderType,
  FolderMapType,
  SelectedFolderListType,
} from '@/types';

type MoveFolderPayload = {
  from: Active;
  to: Over;
  selectedFolderList: SelectedFolderListType;
};

type TreeState = {
  treeDataMap: FolderMapType;
  selectedFolderList: SelectedFolderListType;
  focusFolderId: number | null;
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
  movePick: () => void;
  setTreeMap: (newTreeDate: FolderMapType) => void;
  setSelectedFolderList: (
    newSelectedFolderData: SelectedFolderListType
  ) => void;
  setFrom: (newFrom: Active) => void;
  setTo: (newTo: Over) => void;
  setIsDragging: (isDragging: boolean) => void;
  setFocusFolderId: (newFolderId: number) => void;
  filterByParentId: (parentId: UniqueIdentifier) => FolderType[];
};

const initialState: TreeState = {
  treeDataMap: {},
  selectedFolderList: [],
  focusFolderId: null,
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

      if (!isDnDCurrentData(fromData) || !isDnDCurrentData(toData)) return;
      // SortableContext에 id가 없으면 종료
      if (!fromData.sortable.containerId || !toData.sortable.containerId)
        return;

      // 부모 containerId가 같으면
      if (fromData.sortable.containerId === toData.sortable.containerId) {
        const parentId = fromData.sortable.containerId;
        const fromId = from.id;
        const toId = to.id;

        set((state) => {
          const childFolderList = state.treeDataMap[parentId].childFolderList;
          state.treeDataMap[parentId].childFolderList =
            reorderFolderInSameParent({
              childFolderList,
              fromId,
              toId,
              selectedFolderList,
            });
        });

        return;
      }

      const sourceParentId = fromData.sortable.containerId;
      const targetParentId = toData.sortable.containerId;
      const targetId = to.id;

      set((state) => {
        const newTreeDataMap = moveFolderToDifferentParent({
          treeDataMap: state.treeDataMap,
          selectedFolderList: state.selectedFolderList,
          sourceParentId,
          targetParentId,
          targetId,
        });

        if (!newTreeDataMap) {
          return;
        }

        state.treeDataMap = newTreeDataMap;
        state.treeDataMap = changeParentFolderId({
          treeDataMap: state.treeDataMap,
          childFolderList: state.selectedFolderList,
          parentId: targetParentId,
        });
      });
    },
    setFocusFolderId: (newFolderId) => {
      set((state) => {
        state.focusFolderId = newFolderId;
      });
    },
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
