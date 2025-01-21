import type { FolderRecordType } from '@/types/FolderRecordType';

export const isSameParentFolder = ({
  folderId1,
  folderId2,
  folderRecord,
}: IsSameParentFolderParamType) => {
  if (!folderRecord) {
    return false;
  }

  if (!folderRecord[folderId1] || !folderRecord[folderId2]) {
    return false;
  }

  return (
    folderRecord[folderId1].parentFolderId ===
    folderRecord[folderId2].parentFolderId
  );
};

interface IsSameParentFolderParamType {
  folderId1: number;
  folderId2: number;
  folderRecord: FolderRecordType | undefined;
}
