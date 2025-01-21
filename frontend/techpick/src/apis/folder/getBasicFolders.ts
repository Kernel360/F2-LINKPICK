import type { BasicFolderRecordType } from '@/types/BasicFolderRecordType';
import type { GetBasicFolderListType } from '@/types/GetBasicFolderListType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

export const getBasicFolders = async () => {
  const data = await getBasicFolderList();
  const basicFolderMap = classifyByFolderType(data);
  return basicFolderMap;
};

const getBasicFolderList = async () => {
  try {
    const response = await apiClient.get<GetBasicFolderListType>(
      API_URLS.GET_BASIC_FOLDERS,
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
  }, {} as BasicFolderRecordType);
};
