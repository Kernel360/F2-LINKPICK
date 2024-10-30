import { useQuery } from '@tanstack/react-query';
import { generateDummyServerData } from './dummyData';

/**
 * @description 포커스된 폴더 id 변경 혹은 pick 검색 내용 변경시 쿼리 재호출
 */
export const useGetPickSearchQuery = ({
  folderIdList,
  searchParamList,
}: UseGetPickSearchQueryPayload = initialPayload) => {
  return useQuery({
    queryKey: ['viewScope', folderIdList, searchParamList],
    queryFn: () => generateDummyServerData(),
  });
};

const initialPayload: UseGetPickSearchQueryPayload = {
  folderIdList: [],
  searchParamList: [],
};

interface UseGetPickSearchQueryPayload {
  folderIdList?: readonly number[];
  searchParamList?: readonly string[];
}
