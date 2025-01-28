import type { PickInfoType } from '@/types/PickInfoType';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type SearchPickStoreState = {
  searchQuery: string;
  searchTag: string;
  searchFolder: string;
  hoverPickInfo: PickInfoType | undefined | null;
};

type SearchPickStoreActions = {
  setSearchQuery: (query: string) => void;
  setSearchTag: (tag: string) => void;
  setSearchFolder: (folder: string) => void;
  reset: () => void;
  setHoverPickInfo: (newHoverPickInfo: PickInfoType) => void;
};

const initialState: SearchPickStoreState = {
  searchQuery: '',
  searchTag: '',
  searchFolder: '',
  hoverPickInfo: null,
};

export const useSearchPickStore = create<
  SearchPickStoreState & SearchPickStoreActions
>()(
  subscribeWithSelector(
    immer((set) => ({
      ...initialState,
      setSearchQuery: (query: string) =>
        set((state) => {
          state.searchQuery = query;
        }),
      setSearchTag: (tag: string) =>
        set((state) => {
          if (state.searchTag !== tag) {
            state.searchTag = tag;
          }
        }),
      setSearchFolder: (folder: string) =>
        set((state) => {
          state.searchFolder = folder;
        }),
      setHoverPickInfo: (newHoverPickInfo) => {
        set((state) => {
          state.hoverPickInfo = newHoverPickInfo;
        });
      },
      reset: () =>
        set((state) => {
          Object.assign(state, initialState);
        }),
    })),
  ),
);
