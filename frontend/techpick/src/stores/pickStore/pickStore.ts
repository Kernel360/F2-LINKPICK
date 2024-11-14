import { enableMapSet } from 'immer';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getPicksByFolderId, movePicks } from '@/apis/pick';
import { getPicksByQueryParam } from '@/apis/pick/getPicks';
import { isPickDraggableObject, reorderSortableIdList } from '@/utils';
import type { Active, Over } from '@dnd-kit/core';
import type {
  PickRecordType,
  PickInfoType,
  PickRecordValueType,
  SelectedPickIdListType,
  PickDraggableObjectType,
  PickToFolderDroppableObjectType,
} from '@/types';

enableMapSet();

type PickState = {
  // 전체 검색 시, 실제 조회 결과에 포함된 folder만을 pickRecord에서 획득하고자 추가함.
  recentlyFetchedFolderIdList: Set<number>;
  pickRecord: PickRecordType;
  focusPickId: number | null;
  selectedPickIdList: SelectedPickIdListType;
  isDragging: boolean;
  draggingPickInfo: PickInfoType | null | undefined;
};

type PickAction = {
  fetchPickDataByFolderId: (folderId: number) => Promise<void>;
  getOrderedPickIdListByFolderId: (folderId: number) => number[];
  getOrderedPickListByFolderId: (folderId: number) => PickInfoType[];
  getPickInfoByFolderIdAndPickId: (
    folderId: number,
    pickId: number
  ) => PickInfoType | null | undefined;
  hasPickRecordValue: (
    pickRecordValue: PickRecordValueType | undefined
  ) => pickRecordValue is PickRecordValueType;
  movePicksToEqualFolder: (movePickPayload: MovePickPayload) => Promise<void>;
  movePicksToDifferentFolder: (
    movePickPayload: movePicksToDifferentFolder
  ) => Promise<void>;
  setSelectedPickIdList: (
    newSelectedPickIdList: SelectedPickIdListType
  ) => void;
  selectSinglePick: (pickId: number) => void;
  setIsDragging: (isDragging: boolean) => void;
  setFocusedPickId: (focusedPickId: number) => void;
  setDraggingPickInfo: (
    draggingPickInfo: PickInfoType | null | undefined
  ) => void;
  /**
   * queryParam을 통으로 검색에 사용합니다. (search 패널)
   */
  fetchPickDataByQueryParam: (param: string) => Promise<void>;
  /**
   * 가장 최근 조회된 폴더 id 리스트 반환 (전체 검색용)
   */
  getRecentlyFetchedFolderIdList: () => number[];
};

const initialState: PickState = {
  recentlyFetchedFolderIdList: new Set<number>(),
  pickRecord: {},
  focusPickId: null,
  selectedPickIdList: [],
  isDragging: false,
  draggingPickInfo: null,
};

export const usePickStore = create<PickState & PickAction>()(
  subscribeWithSelector(
    immer((set, get) => ({
      ...initialState,
      fetchPickDataByFolderId: async (folderId) => {
        try {
          const { pickInfoRecord, pickIdOrderedList } =
            await getPicksByFolderId(folderId);

          set((state) => {
            state.recentlyFetchedFolderIdList.add(folderId);
            state.pickRecord[folderId] = {
              pickIdOrderedList,
              pickInfoRecord,
            };
          });
        } catch (error) {
          console.log('fetchPickDataByFolderId error', error);
        }
      },
      getOrderedPickIdListByFolderId: (folderId) => {
        const pickRecordValue = get().pickRecord[`${folderId}`];

        if (!get().hasPickRecordValue(pickRecordValue)) {
          return [];
        }
        const { pickIdOrderedList } = pickRecordValue;

        return pickIdOrderedList;
      },
      getOrderedPickListByFolderId: (folderId: number) => {
        const pickRecordValue = get().pickRecord[`${folderId}`];

        if (!get().hasPickRecordValue(pickRecordValue)) {
          return [];
        }

        const { pickIdOrderedList, pickInfoRecord } = pickRecordValue;
        const pickOrderedList: PickInfoType[] = [];

        for (const pickId of pickIdOrderedList) {
          const pickInfo = pickInfoRecord[`${pickId}`];

          if (pickInfo) {
            pickOrderedList.push(pickInfo);
          }
        }

        return pickOrderedList;
      },
      getPickInfoByFolderIdAndPickId: (folderId, pickId) => {
        const pickRecordValue = get().pickRecord[`${folderId}`];

        if (!get().hasPickRecordValue(pickRecordValue)) {
          return null;
        }

        const { pickIdOrderedList, pickInfoRecord } = pickRecordValue;

        if (!pickIdOrderedList.includes(pickId)) {
          return null;
        }

        return pickInfoRecord[`${pickId}`];
      },
      hasPickRecordValue: (
        pickRecordValue
      ): pickRecordValue is PickRecordValueType => {
        if (!pickRecordValue) {
          return false;
        }

        return true;
      },
      movePicksToEqualFolder: async ({ from, to }) => {
        const fromData = from.data.current;
        const toData = to.data.current;

        if (!isPickDraggableObject(fromData) || !isPickDraggableObject(toData))
          return;
        // SortableContext에 id가 없으면 종료
        if (!fromData.sortable.containerId || !toData.sortable.containerId)
          return;

        const folderId = fromData.sortable.containerId;
        const pickRecordValue = get().pickRecord[folderId];

        if (!get().hasPickRecordValue(pickRecordValue)) {
          return;
        }

        const prevPickIdOrderedList = pickRecordValue.pickIdOrderedList;
        const fromId = from.id;
        const toId = to.id;

        set((state) => {
          if (!state.pickRecord[folderId]) {
            return;
          }

          state.pickRecord[folderId].pickIdOrderedList = reorderSortableIdList({
            sortableIdList: prevPickIdOrderedList,
            fromId,
            toId,
            selectedFolderList: state.selectedPickIdList,
          });
        });

        try {
          await movePicks({
            idList: get().selectedPickIdList,
            orderIdx: toData.sortable.index,
            destinationFolderId: Number(folderId),
          });
        } catch {
          set((state) => {
            const curPickRecordValue = state.pickRecord[`${folderId}`];

            if (!get().hasPickRecordValue(curPickRecordValue)) {
              return;
            }

            curPickRecordValue.pickIdOrderedList = prevPickIdOrderedList;
            state.pickRecord[`${folderId}`] = curPickRecordValue;
          });
        }
      },
      movePicksToDifferentFolder: async ({ from, to }) => {
        const currentFolderId = from.parentFolderId;
        const nextFolderId = to.id;

        const currentPickRecordValue = get().pickRecord[currentFolderId];
        let nextPickRecordValue = get().pickRecord[nextFolderId];

        if (!get().hasPickRecordValue(currentPickRecordValue)) {
          return;
        }

        /**
         * @description 다음 들어갈 곳에 값이 없으면 만들어줘야한다.
         */
        if (!get().hasPickRecordValue(nextPickRecordValue)) {
          set((state) => {
            state.pickRecord[nextFolderId] = {
              pickIdOrderedList: [],
              pickInfoRecord: {},
            };
          });
          nextPickRecordValue = get().pickRecord[currentFolderId];
        }

        if (!nextPickRecordValue) {
          return;
        }

        // a. 다른 폴더에서 추가(0번째 인덕스)
        // 어떤 정보를 가져와야한다.
        const selectedPickIdList = get().selectedPickIdList;
        const selectedPickInfoList: PickInfoType[] = [];
        const {
          pickInfoRecord: prevCurrentPickInfoRecord,
          pickIdOrderedList: prevCurrentPickIdOrderedList,
        } = currentPickRecordValue;

        // 선택된 정보 가져오기.
        for (const selectedPickId of selectedPickIdList) {
          const selectedPickInfo = get().getPickInfoByFolderIdAndPickId(
            currentFolderId,
            selectedPickId
          );

          if (selectedPickInfo) {
            selectedPickInfoList.push(selectedPickInfo);
          }
        }

        // 다른 폴더에 저장하기 전에 이전 상태를 저장해야한다.
        const {
          pickIdOrderedList: prevNextPickIdOrderedList,
          pickInfoRecord: prevNextPickInfoRecord,
        } = nextPickRecordValue;

        // 값 추가하기.
        set((state) => {
          if (!get().hasPickRecordValue(state.pickRecord[nextFolderId])) {
            return;
          }

          for (const selectedPickInfo of selectedPickInfoList) {
            state.pickRecord[nextFolderId].pickInfoRecord[
              `${selectedPickInfo.id}`
            ] = selectedPickInfo;
          }

          state.pickRecord[nextFolderId].pickIdOrderedList.splice(
            selectedPickIdList.length,
            0,
            ...selectedPickIdList
          );
        });

        // 현재 폴더에서 삭제.
        set((state) => {
          if (!get().hasPickRecordValue(state.pickRecord[currentFolderId])) {
            return;
          }

          for (const selectedPickInfo of selectedPickInfoList) {
            state.pickRecord[currentFolderId].pickInfoRecord[
              `${selectedPickInfo.id}`
            ] = undefined;
          }

          state.pickRecord[currentFolderId].pickIdOrderedList =
            prevCurrentPickIdOrderedList.filter(
              (pickId) => !selectedPickIdList.includes(pickId)
            );
        });

        // api 요청
        try {
          await movePicks({
            idList: get().selectedPickIdList,
            destinationFolderId: Number(nextFolderId),
          });
        } catch {
          // 현재 폴더에서 이전 상태로 원복
          set((state) => {
            if (!state.pickRecord[currentFolderId]) {
              return;
            }
            state.pickRecord[currentFolderId].pickIdOrderedList =
              prevCurrentPickIdOrderedList;
            state.pickRecord[currentFolderId].pickInfoRecord =
              prevCurrentPickInfoRecord;
          });

          // 이동한 폴더를 이전 상태로 원복
          set((state) => {
            if (!state.pickRecord[nextFolderId]) {
              return;
            }

            state.pickRecord[nextFolderId].pickIdOrderedList =
              prevNextPickIdOrderedList;
            state.pickRecord[nextFolderId].pickInfoRecord =
              prevNextPickInfoRecord;
          });
        }
      },
      setSelectedPickIdList: (newSelectedPickIdList) => {
        set((state) => {
          state.selectedPickIdList = newSelectedPickIdList;
        });
      },
      selectSinglePick: (pickId) => {
        set((state) => {
          state.focusPickId = pickId;
          state.selectedPickIdList = [pickId];
        });
      },
      setIsDragging: (isDragging) => {
        set((state) => {
          state.isDragging = isDragging;
        });
      },
      setFocusedPickId: (focusedPickId) => {
        set((state) => {
          state.focusPickId = focusedPickId;
        });
      },

      setDraggingPickInfo: (draggingPickInfo) => {
        set((state) => {
          state.draggingPickInfo = draggingPickInfo;
        });
      },

      fetchPickDataByQueryParam: async (param) => {
        try {
          const result = await getPicksByQueryParam(param);
          result.forEach((record) => {
            // 전체 검색 조회시 사용자의 모든 폴더 목록을 보여주는게 아니다.
            // 검색 결과에 포함된 것만 보여줘야 한다.
            // 따라서, 아래 Set을 이용해서 response에 담겨온 폴더 id만을 조회한다.
            // 반복문을 통한 partial update의 성능에 대해 고민해볼 것.
            set((state) => {
              state.recentlyFetchedFolderIdList.add(record.parentFolderId);
              state.pickRecord[record.parentFolderId] = {
                pickIdOrderedList: record.pickIdOrderedList,
                pickInfoRecord: record.pickInfoRecord,
              };
            });
          });
        } catch (error) {
          console.log('fetchPickDataByFolderId error', error);
        }
      },
      getRecentlyFetchedFolderIdList: () => {
        return Array.from(get().recentlyFetchedFolderIdList);
      },
    }))
  )
);

type MovePickPayload = {
  folderId: number;
  from: Active;
  to: Over;
};

type movePicksToDifferentFolder = {
  from: PickDraggableObjectType;
  to: PickToFolderDroppableObjectType;
};
