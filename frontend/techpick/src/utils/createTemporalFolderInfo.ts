import type { CreateFolderRequestType } from '@/types/CreateFolderRequestType';
import type { FolderType } from '@/types/FolderType';

export const geteTemporalFolderInfo = ({
  id,
  name,
  parentFolderId,
}: createTemporalFolderInfoParamType): FolderType => {
  const temporalFolderInfo: FolderType = {
    id,
    name,
    parentFolderId,
    childFolderIdOrderedList: [],
    folderType: 'GENERAL',
    folderAccessToken: null,
    updatedAt: new Date().toDateString(),
    createdAt: new Date().toDateString(),
  };

  return temporalFolderInfo;
};

interface createTemporalFolderInfoParamType extends CreateFolderRequestType {
  id: number;
}
