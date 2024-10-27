import { useQuery } from '@tanstack/react-query';
import { ViewScope } from '../model/useViewScope';

export const useViewData = (viewScope: ViewScope) => {
  return useQuery({
    // 포커스된 폴더 id가 바뀌거나, pick 내용 검색이 바뀌었을 때 쿼리를 재호출합니다.
    queryKey: ['viewScope', viewScope.folderIds, viewScope.pickContents],
    queryFn: () =>
      `query with folder:${viewScope.folderIds} pick:${viewScope.pickContents}`,
  });
};
