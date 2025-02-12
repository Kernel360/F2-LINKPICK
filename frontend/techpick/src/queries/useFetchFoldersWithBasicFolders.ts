import { getFoldersWithBasicFolders } from '@/apis/folder/getFoldersWithBasicFolders';
import { useQuery } from '@tanstack/react-query';
import { folderKeys } from './folderKeys';

export function useFetchFoldersWithBasicFolders() {
  return useQuery({
    queryKey: folderKeys.rootAndBasic(),
    queryFn: getFoldersWithBasicFolders,
  });
}
