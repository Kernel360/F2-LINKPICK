'use client';

import { getAllPickListByFolderId } from '@/apis/pick/getAllPickListByFolderId';
import type { FolderIdType } from '@/types/FolderIdType';
import { useQuery } from '@tanstack/react-query';
import { pickKeys } from './pickKeys';

export function useFetchAllPickListByFolderId(folderId: FolderIdType) {
  return useQuery({
    queryKey: pickKeys.folderId(folderId),
    queryFn: () => getAllPickListByFolderId(folderId),
  });
}
