export const ROUTES = {
  HOME: '/',
  UNCLASSIFIED_FOLDER: '/folders',
  FOLDERS_UNCLASSIFIED: '/folders/unclassified',
  FOLDERS_RECYCLE_BIN: '/folders/recycle-bin',
  FOLDER_DETAIL: (folderId: number) => `/folders/${folderId}`,
  SEARCH: '/folders/search',
  LOGIN: '/login',
};
