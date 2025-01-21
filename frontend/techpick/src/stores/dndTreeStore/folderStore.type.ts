import type { FolderType } from '@/types/FolderType';
import type { SelectedFolderListType } from '@/types/SelectedFolderListType';

export interface TreeState {
  selectedFolderList: SelectedFolderListType;
  hoverFolderId: number | null | undefined;
  isDragging: boolean;
  draggingFolderInfo: FolderType | null | undefined;
  rootFolderId: number;
  isShareFolder: boolean;
}

export interface TreeAction {
  setSelectedFolderList: (
    newSelectedFolderData: SelectedFolderListType,
  ) => void;
  setIsDragging: (isDragging: boolean) => void;
  setHoverFolderId: (hoverFolderId: number | null | undefined) => void;
  setDraggingFolderInfo: (
    draggingFolderInfo: FolderType | null | undefined,
  ) => void;
}
