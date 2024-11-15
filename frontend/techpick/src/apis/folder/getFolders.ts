import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import type { GetFolderListResponseType, FolderMapType } from '@/types';

export const getFolders = async () => {
  const data = await getRootFolderList();
  const folderMap = generateFolderMap(data);
  return folderMap;
};

const getRootFolderList = async () => {
  try {
    const response = await apiClient.get<GetFolderListResponseType>(
      API_URLS.GET_FOLDERS
    );
    const data = await response.json();

    return data;
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};

const generateFolderMap = (folderList: GetFolderListResponseType) => {
  return folderList.reduce((acc, folder) => {
    acc[`${folder.id}`] = folder;

    return acc;
  }, {} as FolderMapType);
};
