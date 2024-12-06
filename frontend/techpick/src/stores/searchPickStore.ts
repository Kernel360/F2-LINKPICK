import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getPickListByQueryParam } from '@/apis/pick/getPicks';
import { PickListType } from '@/types';

const initialState = {
  searchResultList: [],
  lastCursor: 0,
  size: 20,
  hasNext: true,
  searchQuery: '',
  searchTag: '',
  searchFolder: '',
  isLoading: false,
};

type SearchPickStoreState = {
  searchResultList: PickListType;
  lastCursor: number;
  size: number;
  hasNext: boolean;
  searchQuery: string;
  searchTag: string;
  searchFolder: string;
  isLoading: boolean;
};

type SearchPickStoreActions = {
  searchPicksByQueryParam: (
    cursor?: number | string,
    size?: number
  ) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSearchTag: (tag: string) => void;
  setSearchFolder: (folder: string) => void;
};

export const useSearchPickStore = create<
  SearchPickStoreState & SearchPickStoreActions
>()(
  subscribeWithSelector(
    immer((set, get) => ({
      ...initialState,
      searchPicksByQueryParam: async (
        cursor?: number | string,
        size?: number
      ) => {
        try {
          set((state) => {
            state.isLoading = true;
          });
          const state = get();
          const param = `searchTokenList=${state.searchQuery}&tagIdList=${state.searchTag}&folderIdList=${state.searchFolder}`;
          const result = await getPickListByQueryParam(param, cursor, size);

          set((state) => {
            state.searchResultList = result.content;
            state.lastCursor = result.lastCursor;
            state.size = result.size;
            state.hasNext = result.hasNext;
          });
        } catch (error) {
          console.log('fetchPickDataByFolderId error', error);
        } finally {
          set((state) => {
            state.isLoading = false;
          });
        }
      },
      setSearchQuery: (query: string) =>
        set((state) => {
          state.searchQuery = query;
        }),
      setSearchTag: (tag: string) =>
        set((state) => {
          state.searchTag = tag;
        }),
      setSearchFolder: (folder: string) =>
        set((state) => {
          state.searchFolder = folder;
        }),
    }))
  )
);
