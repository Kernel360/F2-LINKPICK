import { useQuery } from '@tanstack/react-query';
import type { ViewState } from '../model/useViewScope.type';

export const useViewDataQuery = (viewState: ViewState) => {
  return useQuery({
    // 포커스된 폴더 id가 바뀌거나, pick 내용 검색이 바뀌었을 때 쿼리를 재호출합니다.
    queryKey: ['viewScope', viewState.folderIds, viewState.pickContents],
    queryFn: () =>
      `query with folder:${viewState.folderIds} pick:${viewState.pickContents}`,
  });
};
