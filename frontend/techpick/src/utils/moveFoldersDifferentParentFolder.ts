import type { FolderRecordType } from '@/types/FolderRecordType';
import { hasIndex } from './hasIndex';

export const moveFoldersToDifferentParentFolder = ({
  destinationFolderId,
  idList,
  nextFolders,
  parentFolderId,
  toId,
}: MoveFoldersToDifferentParentFolderParamType): void => {
  if (!nextFolders[parentFolderId] || !nextFolders[destinationFolderId]) {
    return;
  }

  nextFolders[parentFolderId].childFolderIdOrderedList = nextFolders[
    parentFolderId
  ].childFolderIdOrderedList.filter(
    (childFolderId) => !idList.includes(childFolderId),
  );

  const destinationChildFolderIdOrderedList =
    nextFolders[destinationFolderId].childFolderIdOrderedList;
  const targetIndex =
    destinationChildFolderIdOrderedList.findIndex(
      (childFolderId) => childFolderId === toId,
    ) + 1;

  if (hasIndex(targetIndex)) {
    const beforeNextIndexList = destinationChildFolderIdOrderedList
      .slice(0, targetIndex)
      .filter((index) => !idList.includes(index));
    const afterNextIndexList = destinationChildFolderIdOrderedList
      .slice(targetIndex)
      .filter((index) => !idList.includes(index));
    nextFolders[destinationFolderId].childFolderIdOrderedList = [
      ...beforeNextIndexList,
      ...idList,
      ...afterNextIndexList,
    ];
  }
};

interface MoveFoldersToDifferentParentFolderParamType {
  nextFolders: FolderRecordType;
  parentFolderId: number;
  destinationFolderId: number;
  idList: number[];
  toId: number;
}
