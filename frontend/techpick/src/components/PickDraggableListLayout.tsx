import { pickDraggableListLayoutStyle } from './pickDraggableListLayout.css';
import { PickListSortableContextProvider } from './PickListSortableContextProvider';
import { PickViewDraggableItemListLayoutComponentProps } from '@/types';

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
