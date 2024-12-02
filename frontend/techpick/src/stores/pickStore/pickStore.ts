import { enableMapSet } from 'immer';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  getPicksByFolderId,
  movePicks,
  updatePick,
  deletePicks,
} from '@/apis/pick';
import { getPickListByQueryParam } from '@/apis/pick/getPicks';
import { isPickDraggableObject, reorderSortableIdList } from '@/utils';
import type {
  DeleteSelectedPicksPayload,
  PickAction,
  PickState,
} from './pickStore.type';
import type {
  PickInfoType,
  PickRecordValueType,
  SearchPicksResponseType,
} from '@/types';

enableMapSet();

const initialState: PickState = {
  searchResult: { lastCursor: 0, hasNext: true } as SearchPicksResponseType,
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
        set((state) => {
          if (!state.pickRecord[folderId]) {
            state.pickRecord[folderId] = {
              data: null,
              isError: false,
              isLoading: false,
              error: 'null',
            };
          }

          state.pickRecord[folderId].isLoading = true;
        });

        try {
          const { pickInfoRecord, pickIdOrderedList } =
            await getPicksByFolderId(folderId);

          set((state) => {
            state.pickRecord[folderId] = {
              isLoading: false,
              isError: false,
              error: null,
              data: { pickIdOrderedList, pickInfoRecord },
            };
          });
        } catch {
          set((state) => {
            state.pickRecord[folderId] = {
              isLoading: false,
              isError: true,
              error: `fetchPickDataByFolderId ${folderId} error`,
              data: null,
            };
          });
        }
      },
      getOrderedPickIdListByFolderId: (folderId) => {
        const pickRecordValue = get().pickRecord[`${folderId}`];

        if (
          !get().hasPickRecordValue(pickRecordValue?.data) ||
          !pickRecordValue.data
        ) {
          return [];
        }

        const { pickIdOrderedList } = pickRecordValue.data;

        return pickIdOrderedList;
      },

      getPickInfoByFolderIdAndPickId: (folderId, pickId) => {
        const pickRecordValue = get().pickRecord[`${folderId}`];

        if (
          !get().hasPickRecordValue(pickRecordValue?.data) ||
          !pickRecordValue.data
        ) {
          return null;
        }

        const { pickIdOrderedList, pickInfoRecord } = pickRecordValue.data;

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

        if (
          !get().hasPickRecordValue(pickRecordValue?.data) ||
          !pickRecordValue.data
        ) {
          return;
        }

        const prevPickIdOrderedList = pickRecordValue.data.pickIdOrderedList;
        const fromId = from.id;
        const toId = to.id;

        set((state) => {
          if (!state.pickRecord[folderId]?.data) {
            return;
          }

          state.pickRecord[folderId].data.pickIdOrderedList =
            reorderSortableIdList({
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

            if (
              !get().hasPickRecordValue(curPickRecordValue?.data) ||
              !curPickRecordValue.data
            ) {
              return;
            }

            curPickRecordValue.data.pickIdOrderedList = prevPickIdOrderedList;
            state.pickRecord[`${folderId}`] = curPickRecordValue;
          });
        }
      },
      movePicksToDifferentFolder: async ({ from, to }) => {
        const currentFolderId = from.parentFolderId;
        const nextFolderId = to.id;

        const currentPickRecordValue = get().pickRecord[currentFolderId];
        let nextPickRecordValue = get().pickRecord[nextFolderId];

        if (
          !get().hasPickRecordValue(currentPickRecordValue?.data) ||
          !currentPickRecordValue.data
        ) {
          return;
        }

        /**
         * @description 다음 들어갈 곳에 값이 없으면 만들어줘야한다.
         */
        if (
          !get().hasPickRecordValue(nextPickRecordValue?.data) ||
          !nextPickRecordValue.data
        ) {
          set((state) => {
            state.pickRecord[nextFolderId] = {
              data: { pickIdOrderedList: [], pickInfoRecord: {} },
              isLoading: false,
              isError: false,
              error: null,
            };
          });
          nextPickRecordValue = get().pickRecord[currentFolderId];
        }

        if (!nextPickRecordValue?.data) {
          return;
        }

        // a. 다른 폴더에서 추가(0번째 인덕스)
        // 어떤 정보를 가져와야한다.
        const selectedPickIdList = get().selectedPickIdList;
        const selectedPickInfoList: PickInfoType[] = [];
        const {
          pickInfoRecord: prevCurrentPickInfoRecord,
          pickIdOrderedList: prevCurrentPickIdOrderedList,
        } = currentPickRecordValue.data;

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
        } = nextPickRecordValue.data;

        // 값 추가하기.
        set((state) => {
          if (
            !get().hasPickRecordValue(state.pickRecord[nextFolderId]?.data) ||
            !state.pickRecord[nextFolderId].data
          ) {
            return;
          }

          for (const selectedPickInfo of selectedPickInfoList) {
            state.pickRecord[nextFolderId].data.pickInfoRecord[
              `${selectedPickInfo.id}`
            ] = selectedPickInfo;
          }

          state.pickRecord[nextFolderId].data.pickIdOrderedList.splice(
            0,
            0,
            ...selectedPickIdList
          );
        });

        // 현재 폴더에서 삭제.
        set((state) => {
          if (
            !get().hasPickRecordValue(
              state.pickRecord[currentFolderId]?.data
            ) ||
            !state.pickRecord[currentFolderId].data
          ) {
            return;
          }

          for (const selectedPickInfo of selectedPickInfoList) {
            state.pickRecord[currentFolderId].data.pickInfoRecord[
              `${selectedPickInfo.id}`
            ] = undefined;
          }

          state.pickRecord[currentFolderId].data.pickIdOrderedList =
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
            if (!state.pickRecord[currentFolderId]?.data) {
              return;
            }
            state.pickRecord[currentFolderId].data.pickIdOrderedList =
              prevCurrentPickIdOrderedList;
            state.pickRecord[currentFolderId].data.pickInfoRecord =
              prevCurrentPickInfoRecord;
          });

          // 이동한 폴더를 이전 상태로 원복
          set((state) => {
            if (!state.pickRecord[nextFolderId]?.data) {
              return;
            }

            state.pickRecord[nextFolderId].data.pickIdOrderedList =
              prevNextPickIdOrderedList;
            state.pickRecord[nextFolderId].data.pickInfoRecord =
              prevNextPickInfoRecord;
          });
        }
      },
      moveSelectedPicksToRecycleBinFolder: async ({
        picksParentFolderId: currentFolderId,
        recycleBinFolderId: nextFolderId,
      }) => {
        // selected Id list의 값을 휴지통에 추가하고, 현재 값에서 지운뒤,
        const currentPickRecordValue = get().pickRecord[currentFolderId];
        let nextPickRecordValue = get().pickRecord[nextFolderId];

        if (
          !get().hasPickRecordValue(currentPickRecordValue?.data) ||
          !currentPickRecordValue.data
        ) {
          return;
        }

        /**
         * @description 다음 들어갈 곳에 값이 없으면 만들어줘야한다.
         */
        if (
          !get().hasPickRecordValue(nextPickRecordValue?.data) ||
          !nextPickRecordValue.data
        ) {
          set((state) => {
            state.pickRecord[nextFolderId] = {
              isLoading: false,
              isError: false,
              error: null,
              data: { pickIdOrderedList: [], pickInfoRecord: {} },
            };
          });
          nextPickRecordValue = get().pickRecord[currentFolderId];
        }

        if (!nextPickRecordValue?.data) {
          return;
        }

        // a. 다른 폴더에서 추가(0번째 인덕스)
        // 어떤 정보를 가져와야한다.
        const selectedPickIdList = get().selectedPickIdList;
        const selectedPickInfoList: PickInfoType[] = [];
        const {
          pickInfoRecord: prevCurrentPickInfoRecord,
          pickIdOrderedList: prevCurrentPickIdOrderedList,
        } = currentPickRecordValue.data;

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
        } = nextPickRecordValue.data;

        // 값 추가하기.
        set((state) => {
          if (
            !get().hasPickRecordValue(state.pickRecord[nextFolderId]?.data) ||
            !state.pickRecord[nextFolderId].data
          ) {
            return;
          }

          for (const selectedPickInfo of selectedPickInfoList) {
            state.pickRecord[nextFolderId].data.pickInfoRecord[
              `${selectedPickInfo.id}`
            ] = selectedPickInfo;
          }

          state.pickRecord[nextFolderId].data.pickIdOrderedList.splice(
            0,
            0,
            ...selectedPickIdList
          );
        });

        // 현재 폴더에서 삭제.
        set((state) => {
          if (
            !get().hasPickRecordValue(
              state.pickRecord[currentFolderId]?.data
            ) ||
            !state.pickRecord[currentFolderId].data
          ) {
            return;
          }

          for (const selectedPickInfo of selectedPickInfoList) {
            state.pickRecord[currentFolderId].data.pickInfoRecord[
              `${selectedPickInfo.id}`
            ] = undefined;
          }

          state.pickRecord[currentFolderId].data.pickIdOrderedList =
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
            if (!state.pickRecord[currentFolderId]?.data) {
              return;
            }
            state.pickRecord[currentFolderId].data.pickIdOrderedList =
              prevCurrentPickIdOrderedList;
            state.pickRecord[currentFolderId].data.pickInfoRecord =
              prevCurrentPickInfoRecord;
          });

          // 이동한 폴더를 이전 상태로 원복
          set((state) => {
            if (!state.pickRecord[nextFolderId]?.data) {
              return;
            }

            state.pickRecord[nextFolderId].data.pickIdOrderedList =
              prevNextPickIdOrderedList;
            state.pickRecord[nextFolderId].data.pickInfoRecord =
              prevNextPickInfoRecord;
          });
        }
      },
      deleteSelectedPicks: async ({
        recycleBinFolderId,
      }: DeleteSelectedPicksPayload) => {
        const recycleBinFolderPickRecord = get().pickRecord[recycleBinFolderId];
        const selectedPickIdList = get().selectedPickIdList;

        if (
          !get().hasPickRecordValue(recycleBinFolderPickRecord?.data) ||
          recycleBinFolderPickRecord.data
        ) {
          return;
        }

        const prevRecycleBinFolderPickRecord = recycleBinFolderPickRecord;

        // 미리 삭제.
        set((state) => {
          if (
            !get().hasPickRecordValue(
              state.pickRecord[recycleBinFolderId]?.data
            ) ||
            !state.pickRecord[recycleBinFolderId].data
          ) {
            return;
          }

          for (const selectedId of selectedPickIdList) {
            state.pickRecord[recycleBinFolderId].data.pickInfoRecord[
              selectedId
            ] = undefined;
          }

          state.pickRecord[recycleBinFolderId].data.pickIdOrderedList =
            state.pickRecord[recycleBinFolderId].data.pickIdOrderedList.filter(
              (pickId) => !selectedPickIdList.includes(pickId)
            );
        });

        try {
          await deletePicks({ idList: selectedPickIdList });
        } catch {
          set((state) => {
            state.pickRecord[recycleBinFolderId] =
              prevRecycleBinFolderPickRecord;
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
      searchPicksByQueryParam: async (
        param: string,
        cursor?: number | string,
        size?: number
      ) => {
        try {
          const result = await getPickListByQueryParam(param, cursor, size);
          set((state) => {
            state.searchResult = result;
          });
        } catch (error) {
          console.log('fetchPickDataByFolderId error', error);
        }
      },
      getSearchResult: () => {
        return get().searchResult;
      },
      updatePickInfo: async (pickParentFolderId, pickInfo) => {
        const {
          id: pickId,
          tagIdOrderedList: newTagOrderedList,
          title: newTitle,
        } = pickInfo;

        const pickRecordValue = get().pickRecord[pickParentFolderId];

        if (
          !get().hasPickRecordValue(pickRecordValue?.data) ||
          !pickRecordValue.data
        ) {
          return;
        }

        const { pickInfoRecord } = pickRecordValue.data;

        if (!pickInfoRecord[pickId]) {
          return;
        }

        const prevPickInfo = pickInfoRecord[pickId];
        const newPickInfo: PickInfoType = {
          ...prevPickInfo,
          title: newTitle ?? prevPickInfo.title,
          tagIdOrderedList: newTagOrderedList ?? prevPickInfo.tagIdOrderedList,
        };

        // 미리 업데이트
        set((state) => {
          if (!state.pickRecord[pickParentFolderId]?.data) {
            return;
          }

          const { pickInfoRecord } = state.pickRecord[pickParentFolderId].data;
          pickInfoRecord[pickId] = newPickInfo;
        });

        try {
          await updatePick(pickInfo);
        } catch {
          // 실패하면 원복하기.
          set((state) => {
            if (!state.pickRecord[pickParentFolderId]?.data) {
              return;
            }

            const { pickInfoRecord } =
              state.pickRecord[pickParentFolderId].data;
            pickInfoRecord[pickId] = prevPickInfo;
          });
        }
      },
    }))
  )
);
