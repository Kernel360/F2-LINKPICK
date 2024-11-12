import { enableMapSet } from 'immer';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getPicksByFolderId, movePicks } from '@/apis/pick';
import { getPicksByQueryParam } from '@/apis/pick/getPicks';
import { isDnDCurrentData, reorderSortableIdList } from '@/utils';
import type { Active, Over } from '@dnd-kit/core';
import type {
  PickRecordType,
  PickInfoType,
  PickRecordValueType,
  SelectedPickIdListType,
} from '@/types';

enableMapSet();

type PickState = {
  // 전체 검색 시, 실제 조회 결과에 포함된 folder만을 pickRecord에서 획득하고자 추가함.
  recentlyFetchedFolderIdList: Set<number>;
  pickRecord: PickRecordType;
  focusPickId: number | null;
  selectedPickIdList: SelectedPickIdListType;
  isDragging: boolean;
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
  movePicks: (movePickPayload: MovePickPayload) => Promise<void>;
  setSelectedPickIdList: (
    newSelectedPickIdList: SelectedPickIdListType
  ) => void;
  selectSinglePick: (pickId: number) => void;
  setIsDragging: (isDragging: boolean) => void;
  setFocusedPickId: (focusedPickId: number) => void;
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
      movePicks: async ({ from, to }) => {
        const fromData = from.data.current;
        const toData = to.data.current;

        if (!isDnDCurrentData(fromData) || !isDnDCurrentData(toData)) return;
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
