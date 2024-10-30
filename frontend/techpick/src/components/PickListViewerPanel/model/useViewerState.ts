import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  SearchParamAction,
  SearchParamState,
  SearchParamReader,
  SearchParamWriter,
} from './useViewerState.type';

// Read Only Handler
export const useSearchParamReader = (): SearchParamReader => {
  const { searchParamList } = useSearchParam();
  return {
    readSearchParamList: () => searchParamList,
  };
};

// Write Only Handler
export const useSearchParamWriter = (): SearchParamWriter => {
  const { setSearchParamList } = useSearchParam();
  return {
    writeSearchParamList: (param: string[]) => setSearchParamList(param),
  };
};

const initialState: SearchParamState = {
  searchParamList: [], // 픽의 제목, 메모 내용으로 검색
};

const useSearchParam = create<SearchParamState & SearchParamAction>()(
  immer((set) => ({
    ...initialState,
    setSearchParamList: (param: string[]) =>
      set((state) => {
        state.searchParamList = param;
      }),
  }))
);
