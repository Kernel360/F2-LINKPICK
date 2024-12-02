export const ROUTES = {
  HOME: '/',
  UNCLASSIFIED_FOLDER: '/folders',
  FOLDERS_UNCLASSIFIED: '/folders/unclassified',
  FOLDERS_RECYCLE_BIN: '/folders/recycle-bin',
  FOLDERS_ROOT: '/folders/home',
  FOLDER_DETAIL: (folderId: number) => `/folders/${folderId}`,
  SEARCH: '/folders/search',
  LOGIN: '/login',
  MY_PAGE: '/mypage',
};
