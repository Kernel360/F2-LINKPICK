import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type UpdatePickState = {
  currentUpdateTitlePickId: number | null;
  currentUpdateTagPickId: number | null;
};

type UpdatePickAction = {
  setCurrentUpdateTitlePickId: (nextUpdateTitlePickId: number | null) => void;
  setCurrentUpdateTitlePickIdToNull: () => void;
  setCurrentUpdateTagPickId: (nextUpdateTagPickId: number | null) => void;
  setCurrentUpdateTagPickIdToNull: () => void;
};

const initialState: UpdatePickState = {
  currentUpdateTitlePickId: null,
  currentUpdateTagPickId: null,
};

export const useUpdatePickStore = create<UpdatePickState & UpdatePickAction>()(
  immer((set) => ({
    ...initialState,
    setCurrentUpdateTitlePickId: (nextUpdateTitlePickId) => {
      set((state) => {
        state.currentUpdateTitlePickId = nextUpdateTitlePickId;
      });
    },
    setCurrentUpdateTitlePickIdToNull: () => {
      set((state) => {
        state.currentUpdateTitlePickId = null;
      });
    },
    setCurrentUpdateTagPickId: (nextUpdateTagPickId) => {
      set((state) => {
        state.currentUpdateTagPickId = nextUpdateTagPickId;
      });
    },
    setCurrentUpdateTagPickIdToNull: () => {
      set((state) => {
        state.currentUpdateTagPickId = null;
      });
    },
  }))
);
