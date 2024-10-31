import type { FolderMapType } from '@/types';

export const mockFolders: FolderMapType = {
  '-1': {
    id: -1,
    name: 'Root',
    parentFolderId: 0,
    childFolderList: [2, 1, 3, 4, 5, 6, 7, 8, 9],
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
  '6': {
    id: 6,
    name: 'Projects',
    parentFolderId: -1,
    childFolderList: [],
  },
  '7': {
    id: 7,
    name: 'Notes',
    parentFolderId: -1,
    childFolderList: [],
  },
  '8': {
    id: 8,
    name: 'Archives',
    parentFolderId: -1,
    childFolderList: [],
  },
  '9': {
    id: 9,
    name: 'Favorites',
    parentFolderId: -1,
    childFolderList: [],
  },
};
