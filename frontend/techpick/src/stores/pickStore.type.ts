import type { PickInfoType } from '@/types/PickInfoType';
import type { SelectedPickIdListType } from '@/types/SelectedPickIdListType';

export type PickState = {
  focusPickId: number | null;
  selectedPickIdList: SelectedPickIdListType;
  isDragging: boolean;
  draggingPickInfo: PickInfoType | null | undefined;
};

export type PickAction = {
  setSelectedPickIdList: (
    newSelectedPickIdList: SelectedPickIdListType,
  ) => void;
  selectSinglePick: (pickId: number) => void;
  setIsDragging: (isDragging: boolean) => void;
  setFocusedPickId: (focusedPickId: number) => void;
  setDraggingPickInfo: (
    draggingPickInfo: PickInfoType | null | undefined,
  ) => void;
};
