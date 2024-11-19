import { PickViewDnDItemListLayoutComponentProps } from './DraggablePickListViewer';
import { PickListSortableContext } from './PickListSortableContext';
import { PickRecordListLayout } from './PickRecordListLayout';

export function PickDndRecordListLayout({
  children,
  folderId,
  viewType,
}: PickViewDnDItemListLayoutComponentProps) {
  return (
    <PickRecordListLayout>
      <PickListSortableContext folderId={folderId} viewType={viewType}>
        {children}
      </PickListSortableContext>
    </PickRecordListLayout>
  );
}
