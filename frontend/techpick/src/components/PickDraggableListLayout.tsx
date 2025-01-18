import type { PickViewDraggableItemListLayoutComponentProps } from '@/types/PickViewDraggableItemListLayoutComponentProps';
import { PickListSortableContextProvider } from './PickListSortableContextProvider';
import { pickDraggableListLayoutStyle } from './pickDraggableListLayout.css';

export function PickDraggableListLayout({
  viewType = 'record',
  folderId,
  children,
}: PickViewDraggableItemListLayoutComponentProps) {
  return (
    <PickListSortableContextProvider folderId={folderId} viewType={viewType}>
      <div className={pickDraggableListLayoutStyle}>{children}</div>
    </PickListSortableContextProvider>
  );
}
