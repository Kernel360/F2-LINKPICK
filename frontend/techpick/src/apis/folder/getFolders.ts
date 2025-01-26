import type { FolderRecordType } from '@/types/FolderRecordType';
import type { GetFolderListResponseType } from '@/types/GetFolderListResponseType';
import { getRootFolderList } from './getFolderList';

export const getFolders = async () => {
  const data = await getRootFolderList();
  const folderMap = generateFolderRecord(data);
  return folderMap;
};

const generateFolderRecord = (folderList: GetFolderListResponseType) => {
  return folderList.reduce((acc, folder) => {
    acc[`${folder.id}`] = folder;

    return acc;
  }, {} as FolderRecordType);
};
