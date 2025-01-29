import type { FolderIdType } from '@/types/FolderIdType';
import type { PickInfoType } from '@/types/PickInfoType';
import type { PickListType } from '@/types/PickListType';
import type { PickRecordType } from '@/types/PickRecordType';
import type { SelectedPickIdListType } from '@/types/SelectedPickIdListType';

export type PickState = {
  pickRecord: PickRecordType;
  focusPickId: number | null;
  selectedPickIdList: SelectedPickIdListType;
  isDragging: boolean;
  draggingPickInfo: PickInfoType | null | undefined;
};

export type PickAction = {
  getPickListByFolderId: (folderId: FolderIdType) => PickListType | undefined;
  setSelectedPickIdList: (
    newSelectedPickIdList: SelectedPickIdListType,
  ) => void;
  selectSinglePick: (pickId: number) => void;
  setIsDragging: (isDragging: boolean) => void;
  setFocusedPickId: (focusedPickId: number) => void;
  setDraggingPickInfo: (
    draggingPickInfo: PickInfoType | null | undefined,
  ) => void;
  setPickListByFolderId: (
    folderId: FolderIdType,
    pickList: PickListType | undefined,
  ) => void;
};
