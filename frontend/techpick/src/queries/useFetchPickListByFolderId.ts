'use client';

import { getPickListByFolderId } from '@/apis/pick/getPickListByFolderId';
import type { FolderIdType } from '@/types/FolderIdType';
import { useQuery } from '@tanstack/react-query';
import { pickKeys } from './pickKeys';

export function useFetchPickListByFolderId(folderId: FolderIdType) {
  return useQuery({
    queryKey: pickKeys.folderId(folderId),
    queryFn: () => getPickListByFolderId(folderId),
  });
}
