import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { getFolderMap, getBasicFolderMap, moveFolder } from '@/apis/folder';
import { changeParentFolderId } from './utils/changeParentFolderId';
import { isDnDCurrentData } from './utils/isDnDCurrentData';
import { moveFolderToDifferentParent } from './utils/moveFolderToDifferentParent';
import { reorderFolderInSameParent } from './utils/reorderFoldersInSameParent';
import type { Active, Over, UniqueIdentifier } from '@dnd-kit/core';
import type {
  FolderType,
  FolderMapType,
  SelectedFolderListType,
  BasicFolderMap,
  ChildFolderListType,
} from '@/types';

type TreeState = {
  treeDataMap: FolderMapType;
  selectedFolderList: SelectedFolderListType;
  focusFolderId: number | null;
  from: Active | null;
  to: Over | null;
  isDragging: boolean;
  basicFolderMap: BasicFolderMap | null;
  rootFolderId: number;
};

type TreeAction = {
  createFolder: (payload: CreateFolderPayload) => void;
  readFolder: () => void;
  updateFolderName: (payload: UpdateFolderPayload) => void;
  deleteFolder: (deleteFolderId: number) => void;
  getFolderMap: () => Promise<void>;
  getBasicFolderMap: () => Promise<void>;
  moveFolder: ({
    from,
    to,
    selectedFolderList,
  }: MoveFolderPayload) => Promise<void>;
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
  basicFolderMap: null,
  rootFolderId: -1,
};

export const useTreeStore = create<TreeState & TreeAction>()(
  immer((set, get) => ({
    ...initialState,
    createFolder: ({ parentFolderId, newFolderName, order = 0 }) => {
      // get id from server.
      const newFolderId = new Date().getUTCMilliseconds();

      set((state) => {
        // 자식 생성
        state.treeDataMap[newFolderId] = {
          id: newFolderId,
          name: newFolderName,
          parentFolderId: parentFolderId,
          childFolderList: [],
          folderType: 'GENERAL',
        };

        // 부모에게 자식 연결
        const curChildFolderList =
          state.treeDataMap[parentFolderId].childFolderList;
        curChildFolderList.splice(order, 0, newFolderId);
        state.treeDataMap[parentFolderId].childFolderList = curChildFolderList;
      });
    },
    readFolder: () => {},
    updateFolderName: ({ folderId, newFolderName }) => {
      set((state) => {
        state.treeDataMap[folderId].name = newFolderName;
      });
    },
    deleteFolder: (deleteFolderId) => {
      set((state) => {
        const parentFolderId = state.treeDataMap[deleteFolderId].parentFolderId;
        const childFolderList =
          state.treeDataMap[parentFolderId].childFolderList;
        state.treeDataMap[parentFolderId].childFolderList =
          childFolderList.filter((childId) => childId !== deleteFolderId);
      });
    },
    getFolderMap: async () => {
      try {
        const folderMap = await getFolderMap();

        set((state) => {
          state.treeDataMap = folderMap;
        });
      } catch (error) {
        console.log('getFolderMap error', error);
      }
    },
    getBasicFolderMap: async () => {
      try {
        const basicFolderMap = await getBasicFolderMap();

        set((state) => {
          state.basicFolderMap = basicFolderMap;
          state.rootFolderId = basicFolderMap['ROOT'].id;
        });
      } catch (error) {
        console.log('getBasicFolderMap error', error);
      }
    },

    moveFolder: async ({ from, to, selectedFolderList }) => {
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
        let prevChildeFolderList: ChildFolderListType = [];

        set((state) => {
          const childFolderList = state.treeDataMap[parentId].childFolderList;
          prevChildeFolderList = [...childFolderList];

          state.treeDataMap[parentId].childFolderList =
            reorderFolderInSameParent({
              childFolderList,
              fromId,
              toId,
              selectedFolderList,
            });
        });

        try {
          await moveFolder({
            idList: selectedFolderList,
            orderIdx: toData.sortable.index,
            destinationFolderId: Number(toData.sortable.containerId),
          });
        } catch {
          set((state) => {
            state.treeDataMap[parentId].childFolderList = prevChildeFolderList;
          });
        }

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

type MoveFolderPayload = {
  from: Active;
  to: Over;
  selectedFolderList: SelectedFolderListType;
};

type CreateFolderPayload = {
  parentFolderId: number;
  newFolderName: string;
  order?: number;
};

type UpdateFolderPayload = {
  folderId: number;
  newFolderName: string;
};
