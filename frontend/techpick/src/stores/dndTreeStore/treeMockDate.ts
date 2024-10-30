import type { FolderMapType } from '@/types';

export const mockFolders: FolderMapType = {
  '-1': {
    id: -1,
    name: 'Root',
    parentFolderId: 0,
    childFolderList: [1, 2, 3, 4, 5],
  },
  '1': {
    id: 1,
    name: 'Documents',
    parentFolderId: -1,
    childFolderList: [],
  },
  '2': {
    id: 2,
    name: 'Pictures',
    parentFolderId: -1,
    childFolderList: [],
  },
  '3': {
    id: 3,
    name: 'Music',
    parentFolderId: -1,
    childFolderList: [],
  },
  '4': {
    id: 4,
    name: 'Videos',
    parentFolderId: -1,
    childFolderList: [],
  },
  '5': {
    id: 5,
    name: 'Downloads',
    parentFolderId: -1,
    childFolderList: [],
  },
};
