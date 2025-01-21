'use client';

import { useFetchFolders } from '@/queries/useFetchFolders';
import type { FolderType } from '@/types/FolderType';

export function useGetChildFolderListByParentFolderId(folderId: number) {
  const { data: folders } = useFetchFolders();
  const childFolderIdOrderedList = folders?.[folderId]
    ? folders[folderId].childFolderIdOrderedList
    : [];
  const childFolderList: FolderType[] = [];

  for (const childFolderId of childFolderIdOrderedList) {
    if (folders?.[childFolderId]) {
      childFolderList.push(folders[childFolderId]);
    }
  }

  return { childFolderList };
}
