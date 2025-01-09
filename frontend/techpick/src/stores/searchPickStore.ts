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
  preFetchSearchPicks: () => Promise<void>;
  searchPicksByQueryParam: () => Promise<void>;
  loadMoreSearchPicks: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSearchTag: (tag: string) => void;
  setSearchFolder: (folder: string) => void;
  setHoverPickIndex: (id: number) => void;
  reset: () => void;
};

export const useSearchPickStore = create<
  SearchPickStoreState & SearchPickStoreActions
>()(
  subscribeWithSelector(
    immer((set, get) => ({
      ...initialState,
      /**
       * @description 검색 다이얼로그창이 활성화 되기 전, 미리 데이터를 로드하는 함수
       */
      preFetchSearchPicks: async () => {
        try {
          set((state) => {
            state.isLoading = true;
          });
          const searchParams = {
            searchTokenList: '',
            tagIdList: '',
            folderIdList: '',
          };
          const result = await getPickListByQueryParam(searchParams, '', SIZE);
          set((state) => {
            state.searchResultList = result.content;
            state.lastCursor = result.lastCursor;
            state.hasNext = result.hasNext;
          });
        } catch {
          /* error */
        } finally {
          set((state) => {
            state.isLoading = false;
          });
        }
      },
      /**
       * @description 검색어, 태그, 폴더에 따라 픽을 검색하는 함수
       */
      searchPicksByQueryParam: async () => {
        const state = get();

        if (state.hasNext && !state.isLoading) {
          try {
            set((state) => {
              state.isLoading = true;
            });
            const searchParams = {
              searchTokenList: encodeURIComponent(state.searchQuery),
              tagIdList: state.searchTag,
              folderIdList: state.searchFolder,
            };
            const result = await getPickListByQueryParam(
              searchParams,
              '',
              SIZE
            );
            set((state) => {
              state.searchResultList = result.content;
              state.lastCursor = result.lastCursor;
              state.hasNext = result.hasNext;
            });
          } catch {
            /* error */
          } finally {
            set((state) => {
              state.isLoading = false;
            });
          }
        }
      },
      /**
       * @description infinite scroll 컴포넌트에서 픽을 추가로 검색하는 함수
       */
      loadMoreSearchPicks: async () => {
        const state = get();
        if (state.hasNext && !state.isLoading) {
          try {
            const searchParams = {
              searchTokenList: encodeURIComponent(state.searchQuery),
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
          } catch {
            /* error */
          }
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
      reset: () =>
        set((state) => {
          Object.assign(state, initialState);
        }),
    }))
  )
);
