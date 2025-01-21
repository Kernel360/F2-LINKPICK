import type { FolderType } from '@/types/FolderType';
import type { SelectedFolderListType } from '@/types/SelectedFolderListType';

export interface TreeState {
  selectedFolderList: SelectedFolderListType;
  focusFolderId: number | null;
  hoverFolderId: number | null | undefined;
  isDragging: boolean;
  draggingFolderInfo: FolderType | null | undefined;
  rootFolderId: number;
  isShareFolder: boolean;
}

export interface TreeAction {
  selectSingleFolder: (folderId: number) => void;
  setSelectedFolderList: (
    newSelectedFolderData: SelectedFolderListType,
  ) => void;

  setIsDragging: (isDragging: boolean) => void;
  setFocusFolderId: (newFolderId: number | null) => void;
  setHoverFolderId: (hoverFolderId: number | null | undefined) => void;
  setDraggingFolderInfo: (
    draggingFolderInfo: FolderType | null | undefined,
  ) => void;
}
