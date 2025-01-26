'use client';

import { getRootFolderList } from '@/apis/folder/getFolderList';
import { useQuery } from '@tanstack/react-query';
import { folderKeys } from './folderKeys';

export function useFetchFolderList() {
  return useQuery({
    queryKey: folderKeys.rootList(),
    queryFn: getRootFolderList,
  });
}
