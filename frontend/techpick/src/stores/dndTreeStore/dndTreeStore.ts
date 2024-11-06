import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  getFolders,
  getBasicFolders,
  moveFolder,
  updateFolder,
  createFolder,
} from '@/apis/folder';
import { UNKNOWN_FOLDER_ID } from '@/constants';
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
  createFolder: (payload: CreateFolderPayload) => Promise<void>;
  readFolder: () => void;
  updateFolderName: (payload: UpdateFolderPayload) => Promise<void>;
  deleteFolder: (deleteFolderId: number) => void;
  getFolders: () => Promise<void>;
  getBasicFolders: () => Promise<void>;
  moveFolder: ({
    from,
    to,
    selectedFolderList,
  }: MoveFolderPayload) => Promise<void>;
  moveFolderToRecycleBin: (payload: MoveFolderToRecycleBin) => Promise<void>;
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
  rootFolderId: UNKNOWN_FOLDER_ID,
};

export const useTreeStore = create<TreeState & TreeAction>()(
  immer((set, get) => ({
    ...initialState,
    createFolder: async ({ parentFolderId, newFolderName, order = 0 }) => {
      const temporalNewFolderId = -new Date().getUTCMilliseconds();
      let prevChildIdOrderedList: ChildFolderListType = [];

      set((state) => {
        state.treeDataMap[temporalNewFolderId] = {
          id: temporalNewFolderId,
          name: newFolderName,
          parentFolderId: parentFolderId,
          childFolderIdOrderedList: [],
          folderType: 'GENERAL',
        };

        const curChildFolderList =
          state.treeDataMap[parentFolderId].childFolderIdOrderedList;
        prevChildIdOrderedList = [...curChildFolderList];
        curChildFolderList.splice(order, 0, temporalNewFolderId);
        state.treeDataMap[parentFolderId].childFolderIdOrderedList =
          curChildFolderList;
      });

      try {
        const newFolder = await createFolder({
          name: newFolderName,
          parentFolderId,
        });

        set((state) => {
          state.treeDataMap[`${newFolder.id}`] = newFolder;
          const childFolderIdOrderedList =
            state.treeDataMap[parentFolderId].childFolderIdOrderedList;
          state.treeDataMap[parentFolderId].childFolderIdOrderedList =
            childFolderIdOrderedList.map((childId) => {
              if (childId === temporalNewFolderId) {
                return newFolder.id;
              }

              return childId;
            });
        });
      } catch {
        set((state) => {
          state.treeDataMap[parentFolderId].childFolderIdOrderedList =
            prevChildIdOrderedList;
        });
      }
    },
    readFolder: () => {},
    updateFolderName: async ({ folderId, newFolderName }) => {
      let previousFolderName = '';

      set((state) => {
        previousFolderName = state.treeDataMap[folderId].name;
        state.treeDataMap[folderId].name = newFolderName;
      });

      try {
        await updateFolder({ id: folderId, name: newFolderName });
      } catch {
        set((state) => {
          state.treeDataMap[folderId].name = previousFolderName;
        });
      }
    },
    deleteFolder: (deleteFolderId) => {
      set((state) => {
        const parentFolderId = state.treeDataMap[deleteFolderId].parentFolderId;
        const childFolderList =
          state.treeDataMap[parentFolderId].childFolderIdOrderedList;
        state.treeDataMap[parentFolderId].childFolderIdOrderedList =
          childFolderList.filter((childId) => childId !== deleteFolderId);
      });
    },
    getFolders: async () => {
      try {
        const folderMap = await getFolders();

        set((state) => {
          state.treeDataMap = folderMap;
        });
      } catch (error) {
        console.log('getFolderMap error', error);
      }
    },
    getBasicFolders: async () => {
      try {
        const basicFolderMap = await getBasicFolders();

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
        let prevChildFolderList: ChildFolderListType = [];

        set((state) => {
          const childFolderList =
            state.treeDataMap[parentId].childFolderIdOrderedList;
          prevChildFolderList = [...childFolderList];

          state.treeDataMap[parentId].childFolderIdOrderedList =
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
            state.treeDataMap[parentId].childFolderIdOrderedList =
              prevChildFolderList;
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
    moveFolderToRecycleBin: async ({ deleteFolderId }) => {
      let parentFolderId = UNKNOWN_FOLDER_ID;
      let prevChildFolderList: ChildFolderListType = [];
      const FIRST = 0;
      let recycleBinFolderId = UNKNOWN_FOLDER_ID;

      set((state) => {
        parentFolderId = state.treeDataMap[deleteFolderId].parentFolderId;
        const childFolderList =
          state.treeDataMap[parentFolderId].childFolderIdOrderedList;
        state.treeDataMap[parentFolderId].childFolderIdOrderedList =
          childFolderList.filter((childId) => childId !== deleteFolderId);

        prevChildFolderList = [...childFolderList];
      });

      set((state) => {
        if (state.basicFolderMap) {
          recycleBinFolderId = state.basicFolderMap['RECYCLE_BIN'].id;
        }
      });

      try {
        await moveFolder({
          idList: [deleteFolderId],
          orderIdx: FIRST,
          destinationFolderId: recycleBinFolderId,
        });
      } catch {
        set((state) => {
          state.treeDataMap[parentFolderId].childFolderIdOrderedList =
            prevChildFolderList;
        });
      }
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

      const childFolderIdList = parentFolder.childFolderIdOrderedList;
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

type MoveFolderToRecycleBin = {
  deleteFolderId: number;
};
