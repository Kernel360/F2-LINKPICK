const API_ENDPOINTS = {
  FOLDERS: 'folders',
  LOCATION: 'location',
  BASIC: 'basic',
  PICKS: 'picks',
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
};
