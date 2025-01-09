import { PickViewItemListLayoutComponentProps } from './PickViewItemListLayoutComponentProps';

/**
 * @description 현재는 record지만 추후에 PickRenderModeType와 병합될 예정입니다.
 */
export type PickViewDraggableItemListLayoutComponentProps =
  PickViewItemListLayoutComponentProps<{
    folderId: number;
    viewType: 'record';
  }>;
