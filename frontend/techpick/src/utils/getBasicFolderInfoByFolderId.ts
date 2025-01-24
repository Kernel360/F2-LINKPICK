import type { BasicFolderRecordType } from '@/types/BasicFolderRecordType';

export const getBasicFolderInfoByFolderId = ({
  folderId,
  basicFolderRecord,
}: getFolderInfoByFolderIdParamType) => {
  if (!basicFolderRecord) {
    return undefined;
  }

  for (const [_key, value] of Object.entries(basicFolderRecord)) {
    if (value.id === folderId) {
      return value;
    }
  }

  return undefined;
};

interface getFolderInfoByFolderIdParamType {
  folderId: number;
  basicFolderRecord: BasicFolderRecordType | undefined;
}
