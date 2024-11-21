import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  getFolders,
  getBasicFolders,
  moveFolder,
  deleteFolder,
  updateFolder,
  createFolder,
} from '@/apis/folder';
import getObjectEntries from '@/components/Search/util/getObjectEntries';
import { UNKNOWN_FOLDER_ID } from '@/constants';
import { isFolderDraggableObject, reorderSortableIdList } from '@/utils';
import { changeParentFolderId } from './utils/changeParentFolderId';
import { moveFolderToDifferentParent } from './utils/moveFolderToDifferentParent';
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
  hoverFolderId: number | null | undefined;
  from: Active | null;
  to: Over | null;
  isDragging: boolean;
  draggingFolderInfo: FolderType | null | undefined;
  basicFolderMap: BasicFolderMap | null;
  rootFolderId: number;
};

type TreeAction = {
  createFolder: (payload: CreateFolderPayload) => Promise<void>;
  readFolder: () => void;
  updateFolderName: (payload: UpdateFolderPayload) => Promise<void>;
  deleteFolder: (deleteFolderId: number) => void;
  // TODO: getter, find 같은 규칙 통일 필요.
  //       어떤 get은 fetch 함수고, 어떤 get은 getter임.
  //       findById, findByName 등의 getter는 묶어주기
  getFolderInfoByFolderId: (folderId: number) => FolderType | null;
  getFolders: () => Promise<void>;
  getBasicFolders: () => Promise<void>;
  moveFolder: ({
    from,
    to,
    selectedFolderList,
  }: MoveFolderPayload) => Promise<void>;
  moveFolderToRecycleBin: (payload: MoveFolderToRecycleBin) => Promise<void>;
  movePick: () => void;
  selectSingleFolder: (folderId: number) => void;
  setTreeMap: (newTreeDate: FolderMapType) => void;
  setSelectedFolderList: (
    newSelectedFolderData: SelectedFolderListType
  ) => void;
  setFrom: (newFrom: Active) => void;
  setTo: (newTo: Over) => void;
  setIsDragging: (isDragging: boolean) => void;
  setFocusFolderId: (newFolderId: number) => void;
  setHoverFolderId: (hoverFolderId: number | null | undefined) => void;
  setDraggingFolderInfo: (
    draggingFolderInfo: FolderType | null | undefined
  ) => void;
  getChildFolderListByParentFolderId: (
    parentId: UniqueIdentifier
  ) => FolderType[];
  /**
   * @author 김민규
   * @description 미리 로딩한 나의 폴더 리스트 에서 찾는다.
   * @return {FolderType[]} 찾지 못한 경우 빈 배열 반환
   * */
  findFolderByName: (name: string) => FolderType[];
  /**
   * @author 김민규
   * @description 미리 로딩한 나의 폴더 리스트를 반환
   * */
  getFolderList: () => FolderType[];
};

const initialState: TreeState = {
  treeDataMap: {},
  selectedFolderList: [],
  focusFolderId: null,
  rootFolderId: UNKNOWN_FOLDER_ID,
  hoverFolderId: null,
  from: null,
  to: null,
  isDragging: false,
  basicFolderMap: null,
  draggingFolderInfo: null,
};

export const useTreeStore = create<TreeState & TreeAction>()(
  subscribeWithSelector(
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
            updatedAt: new Date().toDateString(), // TODO: 급하게 했습니다.. 꼭 고칩시다...
            createdAt: new Date().toDateString(), // TODO: 급하게 했습니다.. 꼭 고칩시다...
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
          const parentFolderId =
            state.treeDataMap[deleteFolderId].parentFolderId;
          const childFolderList =
            state.treeDataMap[parentFolderId].childFolderIdOrderedList;
          state.treeDataMap[parentFolderId].childFolderIdOrderedList =
            childFolderList.filter((childId) => childId !== deleteFolderId);
        });
      },
      getFolderInfoByFolderId: (folderId) => {
        const treeDataMap = get().treeDataMap;

        if (!treeDataMap) {
          return null;
        }

        const folderInfo = treeDataMap[folderId];

        if (!folderInfo) {
          return null;
        }

        return folderInfo;
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

        if (
          !isFolderDraggableObject(fromData) ||
          !isFolderDraggableObject(toData)
        )
          return;
        // SortableContext에 id가 없으면 종료
        if (!fromData.sortable.containerId || !toData.sortable.containerId)
          return;

        // 부모 containerId가 같으면
        if (fromData.sortable.containerId === toData.sortable.containerId) {
          const parentId = fromData.sortable.containerId;
          const fromId = fromData.id;
          const toId = toData.id;
          let prevChildFolderList: ChildFolderListType = [];

          set((state) => {
            const childFolderList =
              state.treeDataMap[parentId].childFolderIdOrderedList;
            prevChildFolderList = [...childFolderList];

            state.treeDataMap[parentId].childFolderIdOrderedList =
              reorderSortableIdList({
                sortableIdList: childFolderList,
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
              parentFolderId: Number(fromData.sortable.containerId),
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
      /**
       * @description 나중에 dfs로 휴지통으로 픽들 이동.
       */
      moveFolderToRecycleBin: async ({ deleteFolderId }) => {
        const parentFolderId = get().treeDataMap[deleteFolderId].parentFolderId;
        const prevChildFolderList =
          get().treeDataMap[deleteFolderId].childFolderIdOrderedList;

        set((state) => {
          state.treeDataMap[parentFolderId].childFolderIdOrderedList =
            prevChildFolderList.filter((childId) => childId !== deleteFolderId);
        });

        // set((state) => {
        //   if (state.basicFolderMap) {
        //     recycleBinFolderId = state.basicFolderMap['RECYCLE_BIN'].id;
        //   }
        // });

        try {
          await deleteFolder([deleteFolderId]);
        } catch {
          console.log('error catch!!!');

          // set((state) => {
          //   state.treeDataMap[parentFolderId].childFolderIdOrderedList =
          //     prevChildFolderList;
          // });
        }
      },
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
      getChildFolderListByParentFolderId: (parentFolderId) => {
        const parentFolderInfo = get().treeDataMap[parentFolderId.toString()];

        if (!parentFolderInfo) {
          return [];
        }

        const childFolderIdOrderedList =
          parentFolderInfo.childFolderIdOrderedList;
        const childFolderList = [];

        for (const childFolderId of childFolderIdOrderedList) {
          const curFolderInfo = get().treeDataMap[childFolderId];

          if (!curFolderInfo) {
            continue;
          }

          childFolderList.push(curFolderInfo);
        }

        return childFolderList;
      },
      findFolderByName: (name: string) => {
        const map = get().treeDataMap;
        return getObjectEntries(map)
          .filter(([_, folder]) => folder.name === name)
          .map((entity) => entity[1]);
      },
      getFolderList: () => {
        const map = get().treeDataMap;
        return Array.from(getObjectEntries(map).map((entry) => entry[1]));
      },
    }))
  )
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
