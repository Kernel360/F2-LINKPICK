import type { FolderRecordType } from '@/types/FolderRecordType';
import type { FolderType } from '@/types/FolderType';
import { getFolderInfoByFolderId } from './getFolderInfoByFolderId';

export const getAncestorFolderListFromLeaf = ({
  leaf,
  folderRecord,
}: GetAncestorFolderListFromLeafParamType) => {
  if (!leaf || !folderRecord) {
    return [];
  }

  const folderList = [leaf];
  let parentFolderInfo = getFolderInfoByFolderId({
    folderId: leaf.parentFolderId,
    folderRecord,
  });

  while (parentFolderInfo) {
    folderList.push(parentFolderInfo);
    parentFolderInfo = getFolderInfoByFolderId({
      folderId: parentFolderInfo.parentFolderId,
      folderRecord,
    });
  }

  return folderList.reverse();
};

interface GetAncestorFolderListFromLeafParamType {
  leaf: FolderType | null | undefined;
  folderRecord: FolderRecordType | undefined;
}
