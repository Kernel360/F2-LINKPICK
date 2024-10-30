import { useQuery } from '@tanstack/react-query';
import { generateDummyServerData } from './dummyData';
import { ViewerStateReader } from '../model/useViewerState.type';

/**
 * @description 포커스된 폴더 id 변경 혹은 pick 검색 내용 변경시 쿼리 재호출
 * @param reader
 */
export const useViewerDataQuery = (reader: ViewerStateReader) => {
  return useQuery({
    queryKey: ['viewScope', reader.readFolderIds(), reader.readPickContents()],
    queryFn: () => generateDummyServerData(reader),
  });
};
