import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getPicksByFolderId, movePicks } from '@/apis/pick';
import { isDnDCurrentData, reorderSortableIdList } from '@/utils';
import type { Active, Over } from '@dnd-kit/core';
import type {
  PickRecordType,
  PickInfoType,
  PickRecordValueType,
  SelectedPickIdListType,
} from '@/types';

type PickState = {
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
};

const initialState: PickState = {
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
    }))
  )
);

type MovePickPayload = {
  folderId: number;
  from: Active;
  to: Over;
};
