const API_ENDPOINTS = {
  FOLDERS: 'folders',
  LOCATION: 'location',
  BASIC: 'basic',
  PICKS: 'picks',
  TAGS: 'tags',
  LINKS: 'links',
  SHARED: 'shared',
  LOGOUT: 'logout',
  CLICKED: 'clicked',
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
    queryParam: string,
    cursor?: number | string,
    size?: number
  ) =>
    API_ENDPOINTS.PICKS +
    `/search?${queryParam}` +
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
  POST_LOGOUT: `${API_ENDPOINTS.LOGOUT}`,
  POST_CLICKED_LINK_URL: (url: string) =>
    `${API_ENDPOINTS.LINKS}/${API_ENDPOINTS.CLICKED}?url=${url}`,
};
