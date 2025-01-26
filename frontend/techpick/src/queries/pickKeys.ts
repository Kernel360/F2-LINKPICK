import type { FolderIdType } from '@/types/FolderIdType';

export const pickKeys = {
  all: ['picks'] as const,
  folderId: (folderId: FolderIdType) => [...pickKeys.all, folderId],
};
