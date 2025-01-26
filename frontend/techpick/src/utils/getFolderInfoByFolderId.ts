import type { FolderRecordType } from '@/types/FolderRecordType';

export const getFolderInfoByFolderId = ({
  folderId,
  folderRecord,
}: getFolderInfoByFolderIdParamType) => {
  return folderRecord?.[folderId];
};

interface getFolderInfoByFolderIdParamType {
  folderId: number;
  folderRecord: FolderRecordType | undefined;
}
