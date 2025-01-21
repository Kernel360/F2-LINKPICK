export const ROUTES = {
  HOME: '/',
  UNCLASSIFIED_FOLDER: '/folders',
  RECOMMEND: '/recommend',
  FOLDER_DETAIL: (folderId: number) => `/folders/${folderId}`,
  SEARCH: '/folders/search',
  LOGIN: '/login',
  MY_PAGE: '/mypage',
  LANDING: '/landing',
};
