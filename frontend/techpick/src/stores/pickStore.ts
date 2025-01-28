import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { PickAction, PickState } from './pickStore.type';

const initialState: PickState = {
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
      getPickListByFolderId: (folderId) => {
        return get().pickRecord[folderId];
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
      setPickListByFolderId: (folderId, newPickList) => {
        set((state) => {
          state.pickRecord[folderId] = newPickList;
        });
      },
    })),
  ),
);
