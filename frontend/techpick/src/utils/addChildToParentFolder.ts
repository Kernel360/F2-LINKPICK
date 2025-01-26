import type { FolderRecordType } from '@/types/FolderRecordType';

/**
 * 부모 폴더의 childFolderIdOrderedList에 자식 폴더를 추가합니다.
 */
export const addChildToParentFolder = ({
  folders,
  folderId,
  parentFolderId,
  order = 0,
}: AddChildToParentFolderParamsType) => {
  if (parentFolderId && folders[parentFolderId]) {
    folders[parentFolderId].childFolderIdOrderedList.splice(order, 0, folderId);
  }
};

interface AddChildToParentFolderParamsType {
  folders: FolderRecordType;
  folderId: number;
  parentFolderId: number | null;
  order?: number;
}
