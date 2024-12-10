import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  DraggingRecommendPickState,
  DraggingRecommendPickAction,
} from './draggingRecommendPickStore.type';

const initialState: DraggingRecommendPickState = {
  isDragging: false,
  draggingRecommendPickInfo: null,
};

export const useDraggingRecommendPickStore = create<
  DraggingRecommendPickState & DraggingRecommendPickAction
>()(
  immer((set) => ({
    ...initialState,

    setIsDragging: (isDragging) => {
      set((state) => {
        state.isDragging = isDragging;
      });
    },

    setDraggingPickInfo: (draggingPickInfo) => {
      set((state) => {
        state.draggingRecommendPickInfo = draggingPickInfo;
      });
    },
  }))
);
