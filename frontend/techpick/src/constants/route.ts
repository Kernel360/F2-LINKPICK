export const ROUTES = {
  HOME: '/',
  RECOMMEND: '/recommend',
  FOLDER_DETAIL: (folderId: number) => `/folders/${folderId}`,
  SEARCH: '/folders/search',
  LOGIN: '/login',
  MY_PAGE: '/mypage',
  LANDING: '/landing',
  SHARE: (uuid: string) => `/share/${uuid}`,
};
