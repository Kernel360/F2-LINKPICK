import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface SearchParam {
  folderIdList: number[];
  tagIdList: number[];
  searchTokenList: string[]; // search query
}

const initialState: SearchParam = {
  folderIdList: [],
  tagIdList: [],
  searchTokenList: [], // 픽의 제목, 메모 내용으로 검색
};

export const useSearchParam = create<SearchParam>()(
  immer((/*set*/) => ({
    ...initialState,
  }))
);
