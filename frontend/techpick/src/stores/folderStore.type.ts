import type { FolderIdType } from '@/types/FolderIdType';
import type { FolderRecordType } from '@/types/FolderRecordType';
import type { FolderType } from '@/types/FolderType';
import type { SelectedFolderListType } from '@/types/SelectedFolderListType';
import type { UseMoveFoldersMutationParamType } from '@/types/UseMoveFoldersMutationParamType';

export interface FolderState {
  folderRecord: FolderRecordType;
  selectedFolderList: SelectedFolderListType;
  isDragging: boolean;
  draggingFolderInfo: FolderType | null | undefined;
}

export interface FolderAction {
  setFolderRecord: (newFolderRecordType: FolderRecordType) => void;
  setSelectedFolderList: (
    newSelectedFolderData: SelectedFolderListType,
  ) => void;
  setIsDragging: (isDragging: boolean) => void;
  setDraggingFolderInfo: (
    draggingFolderInfo: FolderType | null | undefined,
  ) => void;
  moveFolder: (moveFolderParam: UseMoveFoldersMutationParamType) => void;
  getChildFolderListByParentFolderId: (folderId: FolderIdType) => FolderType[];
}
