import type { FolderIdType } from '@/types/FolderIdType';
import type { FolderRecordType } from '@/types/FolderRecordType';
import type { FolderType } from '@/types/FolderType';

export const getChildFolderListByParentFolderId = ({
  folderRecord = {},
  folderId,
}: GetChildFolderListByParentFolderIdParamType) => {
  const childFolderIdOrderedList = folderRecord?.[folderId]
    ? folderRecord[folderId].childFolderIdOrderedList
    : [];
  const childFolderList: FolderType[] = [];

  for (const childFolderId of childFolderIdOrderedList) {
    if (folderRecord?.[childFolderId]) {
      childFolderList.push(folderRecord[childFolderId]);
    }
  }

  return childFolderList;
};

interface GetChildFolderListByParentFolderIdParamType {
  folderRecord: FolderRecordType | undefined;
  folderId: FolderIdType;
}
