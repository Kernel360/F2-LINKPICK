import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  PickRenderModeAction,
  PickRenderModeState,
} from './pickRenderModeStore.type';

const initialState: PickRenderModeState = {
  pickRenderMode: 'list',
};

export const usePickRenderModeStore = create<
  PickRenderModeState & PickRenderModeAction
>()(
  immer((set) => ({
    ...initialState,

    setPickRenderMode: (newPickRenderMode) => {
      set((state) => {
        state.pickRenderMode = newPickRenderMode;
      });
    },
  }))
);
