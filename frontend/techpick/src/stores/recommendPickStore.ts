import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  RecommendPickState,
  RecommendPickAction,
} from './recommendPickStore.type';

const initialState: RecommendPickState = {
  isDragging: false,
  draggingRecommendPickInfo: null,
};

export const useRecommendPickStore = create<
  RecommendPickState & RecommendPickAction
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
