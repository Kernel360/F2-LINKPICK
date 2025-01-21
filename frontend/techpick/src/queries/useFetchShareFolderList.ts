import { getSharedFolderList } from '@/apis/folder/getSharedFolderList';
import { useQuery } from '@tanstack/react-query';
import { folderKeys } from './folderKeys';

export function useFetchShareFolderList() {
  return useQuery({
    queryKey: folderKeys.share(),
    queryFn: getSharedFolderList,
  });
}
