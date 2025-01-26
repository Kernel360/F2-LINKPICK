import type { FolderIdType } from '@/types/FolderIdType';

export const getFolderSortableContextId = (folderId: FolderIdType) =>
  `folder-${folderId}`;
