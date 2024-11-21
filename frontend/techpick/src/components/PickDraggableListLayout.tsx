import { PickListSortableContextProvider } from './PickListSortableContextProvider';
import { PickViewDraggableItemListLayoutComponentProps } from '@/types';

export function PickDraggableListLayout({
  viewType = 'record',
  folderId,
  children,
}: PickViewDraggableItemListLayoutComponentProps) {
  return (
    <div>
      <PickListSortableContextProvider folderId={folderId} viewType={viewType}>
        {children}
      </PickListSortableContextProvider>
    </div>
  );
}
