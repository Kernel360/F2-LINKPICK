import type { FolderType } from '@/types';

export const filterSelectableFolder = (
  ...folderLists: FolderType[][]
): FolderType[] => {
  const isSelectableFolder = (folder: FolderType) =>
    folder.folderType !== 'ROOT' && folder.folderType !== 'RECYCLE_BIN';

  return folderLists.flat().filter(isSelectableFolder);
};
