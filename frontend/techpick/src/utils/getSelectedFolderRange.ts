import type { FolderRecordType } from '@/types/FolderRecordType';
import { hasIndex } from '@/utils/hasIndex';

export const getSelectedFolderRange = ({
  startFolderId,
  endFolderId,
  folderRecord,
}: GetSelectedFolderRangePayload) => {
  if (
    !folderRecord ||
    !folderRecord[endFolderId] ||
    !folderRecord[startFolderId]
  ) {
    return [];
  }

  const parentFolderInfo =
    folderRecord[folderRecord[endFolderId].parentFolderId];

  if (!parentFolderInfo) {
    return [];
  }

  const firstSelectedIndex =
    parentFolderInfo.childFolderIdOrderedList.findIndex(
      (childFolderId) => childFolderId === startFolderId,
    );
  const endSelectedIndex = parentFolderInfo.childFolderIdOrderedList.findIndex(
    (childFolderId) => childFolderId === endFolderId,
  );

  if (!hasIndex(firstSelectedIndex) || !hasIndex(endSelectedIndex)) return [];

  const start = Math.min(firstSelectedIndex, endSelectedIndex);
  const end = Math.max(firstSelectedIndex, endSelectedIndex);

  const newSelectedFolderList = parentFolderInfo.childFolderIdOrderedList.slice(
    start,
    end + 1,
  );

  return newSelectedFolderList;
};

interface GetSelectedFolderRangePayload {
  startFolderId: number;
  endFolderId: number;
  folderRecord: FolderRecordType | undefined;
}
