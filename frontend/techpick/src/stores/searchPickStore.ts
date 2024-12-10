import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getPickListByQueryParam } from '@/apis/pick/getPicks';
import { PickListType } from '@/types';

const SIZE = 10;

const initialState = {
  searchResultList: [],
  lastCursor: 0,
  hasNext: true,
  searchQuery: '',
  searchTag: '',
  searchFolder: '',
  isLoading: false,
  hoverPickIndex: 0,
};
{
  /**어디서 클린업할지 생각해야됨 */
}

type SearchPickStoreState = {
  searchResultList: PickListType;
  lastCursor: number;
  hasNext: boolean;
  searchQuery: string;
  searchTag: string;
  searchFolder: string;
  isLoading: boolean;
  hoverPickIndex: number;
};

type SearchPickStoreActions = {
  searchPicksByQueryParam: () => Promise<void>;
  loadMoreSearchPicks: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSearchTag: (tag: string) => void;
  setSearchFolder: (folder: string) => void;
  setHoverPickIndex: (id: number) => void;
};

export const useSearchPickStore = create<
  SearchPickStoreState & SearchPickStoreActions
>()(
  subscribeWithSelector(
    immer((set, get) => ({
      ...initialState,
      searchPicksByQueryParam: async () => {
        const state = get();
        if (state.hasNext && !state.isLoading) {
          try {
            set((state) => {
              state.isLoading = true;
            });
            const searchParams = {
              searchTokenList: state.searchQuery,
              tagIdList: state.searchTag,
              folderIdList: state.searchFolder,
            };
            const result = await getPickListByQueryParam(
              searchParams,
              state.lastCursor,
              SIZE
            );

            set((state) => {
              state.searchResultList = result.content;
              state.lastCursor = result.lastCursor;
              state.hasNext = result.hasNext;
            });
          } catch (error) {
            console.log('fetchPickDataByFolderId error', error);
          } finally {
            set((state) => {
              state.isLoading = false;
            });
          }
        }
      },
      loadMoreSearchPicks: async () => {
        const state = get();
        if (state.hasNext && !state.isLoading) {
          const searchParams = {
            searchTokenList: state.searchQuery,
            tagIdList: state.searchTag,
            folderIdList: state.searchFolder,
          };
          const result = await getPickListByQueryParam(
            searchParams,
            state.lastCursor,
            SIZE
          );
          set((state) => {
            state.searchResultList = state.searchResultList.concat(
              result.content
            );
            state.lastCursor = result.lastCursor;
            state.hasNext = result.hasNext;
          });
        }
      },
      setSearchQuery: (query: string) =>
        set((state) => {
          if (state.searchQuery !== query) {
            state.searchQuery = query;
            state.hasNext = true;
            state.lastCursor = 0;
            state.searchResultList = [];
          }
        }),
      setSearchTag: (tag: string) =>
        set((state) => {
          if (state.searchTag !== tag) {
            state.searchTag = tag;
            state.hasNext = true;
            state.lastCursor = 0;
            state.searchResultList = [];
          }
        }),
      setSearchFolder: (folder: string) =>
        set((state) => {
          if (state.searchFolder !== folder) {
            state.searchFolder = folder;
            state.hasNext = true;
            state.lastCursor = 0;
            state.searchResultList = [];
          }
        }),
      setHoverPickIndex: (id: number) =>
        set((state) => {
          state.hoverPickIndex = id;
        }),
    }))
  )
);
