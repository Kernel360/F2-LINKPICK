import { SearchQueryParam } from '@/types/search';

const API_ENDPOINTS = {
  FOLDERS: 'folders',
  LOCATION: 'location',
  BASIC: 'basic',
  PICKS: 'picks',
  TAGS: 'tags',
  LINKS: 'links',
  SHARED: 'shared',
  LOGOUT: 'logout',
  VIEW: 'view',
  SUGGESTION: 'suggestion',
  RANKING: 'ranking',
  EVENTS: 'events',
};

export const API_URLS = {
  GET_FOLDERS: API_ENDPOINTS.FOLDERS,
  CREATE_FOLDER: API_ENDPOINTS.FOLDERS,
  DELETE_FOLDER: API_ENDPOINTS.FOLDERS,
  UPDATE_FOLDER: API_ENDPOINTS.FOLDERS,
  MOVE_FOLDER: `${API_ENDPOINTS.FOLDERS}/${API_ENDPOINTS.LOCATION}`,
  GET_BASIC_FOLDERS: `${API_ENDPOINTS.FOLDERS}/${API_ENDPOINTS.BASIC}`,
  GET_PICKS_BY_FOLDER_ID: (folderId: number) =>
    `${API_ENDPOINTS.PICKS}?folderIdList=${folderId}`,
  DELETE_PICKS: API_ENDPOINTS.PICKS,
  SEARCH_PICKS_BY_QUERY_PARAM: (
    queryParam: SearchQueryParam,
    cursor?: number | string,
    size?: number
  ) =>
    API_ENDPOINTS.PICKS +
    `/search?` +
    `${queryParam.searchTokenList ? `searchTokenList=${queryParam.searchTokenList}` : ''}` +
    `${queryParam.tagIdList ? `&tagIdList=${queryParam.tagIdList}` : ''}` +
    `${queryParam.folderIdList ? `&folderIdList=${queryParam.folderIdList}` : ''}` +
    `${cursor ? '&cursor=' + cursor : ''}` +
    `${size ? '&size=' + size : ''}`,
  MOVE_PICKS: `${API_ENDPOINTS.PICKS}/${API_ENDPOINTS.LOCATION}`,
  CREATE_PICKS: `${API_ENDPOINTS.PICKS}`,
  UPDATE_PICKS: `${API_ENDPOINTS.PICKS}`,
  CREATE_TAGS: `${API_ENDPOINTS.TAGS}`,
  DELETE_TAGS: `${API_ENDPOINTS.TAGS}`,
  UPDATE_TAGS: `${API_ENDPOINTS.TAGS}`,
  GET_TAGS: `${API_ENDPOINTS.TAGS}`,
  GET_PICK_BY_URL: (url: string) => `${API_ENDPOINTS.PICKS}/link?link=${url}`,
  GET_LINK_OG_DATA: (url: string) => `${API_ENDPOINTS.LINKS}?url=${url}`,
  SHARE_FOLDER: API_ENDPOINTS.SHARED,
  GET_SHARED_FOLER_BY_UUID: (uuid: string) => `${API_ENDPOINTS.SHARED}/${uuid}`,
  DELETE_SHARED_FOLER_BY_FOLDER_ID: (sourceFolderId: number) =>
    `${API_ENDPOINTS.SHARED}/${sourceFolderId}`,
  POST_LOGOUT: `${API_ENDPOINTS.LOGOUT}`,
  POST_USER_PICK_VIEW_EVENT_LOG: `${API_ENDPOINTS.EVENTS}/${API_ENDPOINTS.PICKS}/${API_ENDPOINTS.VIEW}`,
  POST_SHARED_PICK_VIEW_EVENT_LOG: `${API_ENDPOINTS.EVENTS}/${API_ENDPOINTS.SHARED}/${API_ENDPOINTS.VIEW}`,
  GET_SUGGESTION_RANKING_PICKS: `${API_ENDPOINTS.SUGGESTION}/${API_ENDPOINTS.RANKING}`,
};
