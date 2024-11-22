import { PickViewDnDItemListLayoutComponentProps } from './DraggablePickListViewer';
import { PickListItemLayout } from './PickListItemLayout';
import { PickListSortableContext } from './PickListSortableContext';

export function PickDndListItemLayout({
  children,
  folderId,
  viewType,
}: PickViewDnDItemListLayoutComponentProps) {
  return (
    <PickListItemLayout>
      <PickListSortableContext folderId={folderId} viewType={viewType}>
        {children}
      </PickListSortableContext>
    </PickListItemLayout>
  );
}
