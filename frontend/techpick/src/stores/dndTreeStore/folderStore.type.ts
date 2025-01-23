import type { FolderType } from '@/types/FolderType';
import type { SelectedFolderListType } from '@/types/SelectedFolderListType';

export interface TreeState {
  selectedFolderList: SelectedFolderListType;
  isDragging: boolean;
  draggingFolderInfo: FolderType | null | undefined;
}

export interface TreeAction {
  setSelectedFolderList: (
    newSelectedFolderData: SelectedFolderListType,
  ) => void;
  setIsDragging: (isDragging: boolean) => void;
  setDraggingFolderInfo: (
    draggingFolderInfo: FolderType | null | undefined,
  ) => void;
}
