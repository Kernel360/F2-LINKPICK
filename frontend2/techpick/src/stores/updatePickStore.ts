import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type UpdatePickState = {
  currentUpdatePickId: number | null;
};

type UpdatePickAction = {
  setCurrentUpdatePickId: (nextUpdatePickId: number | null) => void;
  setCurrentPickIdToNull: () => void;
};

const initialState: UpdatePickState = {
  currentUpdatePickId: null,
};

export const useUpdatePickStore = create<UpdatePickState & UpdatePickAction>()(
  immer((set) => ({
    ...initialState,
    setCurrentUpdatePickId: (nextUpdatePickId) => {
      set((state) => {
        state.currentUpdatePickId = nextUpdatePickId;
      });
    },
    setCurrentPickIdToNull: () => {
      set((state) => {
        state.currentUpdatePickId = null;
      });
    },
  }))
);
