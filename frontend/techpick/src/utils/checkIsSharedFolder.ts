import type { FolderRecordType } from '@/types/FolderRecordType';

export const checkIsSharedFolder = ({
  folderId,
  folderRecord,
}: CheckIsSharedFolderParamType) => {
  return !!folderRecord?.[folderId]?.folderAccessToken;
};

interface CheckIsSharedFolderParamType {
  folderId: number;
  folderRecord: FolderRecordType | undefined;
}
