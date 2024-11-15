import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import type { GetBasicFolderListType, BasicFolderMap } from '@/types';

export const getBasicFolders = async () => {
  const data = await getBasicFolderList();
  const basicFolderMap = classifyByFolderType(data);
  return basicFolderMap;
};

const getBasicFolderList = async () => {
  try {
    const response = await apiClient.get<GetBasicFolderListType>(
      API_URLS.GET_BASIC_FOLDERS
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

const classifyByFolderType = (basicFolderList: GetBasicFolderListType) => {
  return basicFolderList.reduce((acc, folder) => {
    if (folder.folderType === 'GENERAL') {
      return acc;
    }

    acc[folder.folderType] = folder;
    return acc;
  }, {} as BasicFolderMap);
};
