import type { FolderIdType } from '@/types/FolderIdType';
import type { SearchQueryParamType } from '@/types/SearchQueryParamType';

export const pickKeys = {
  all: ['picks'] as const,
  folderId: (folderId: FolderIdType) => [...pickKeys.all, folderId],
  search: () => [...pickKeys.all, 'search'],
  searchDetail: (searchQueryParam: SearchQueryParamType) => [
    ...pickKeys.search(),

    { ...searchQueryParam },
  ],
};
