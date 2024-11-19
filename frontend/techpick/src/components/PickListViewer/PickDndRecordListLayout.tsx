import { PickViewDnDItemListLayoutComponentProps } from './DraggablePickListViewer';
import { PickListSortableContext } from './PickListSortableContext';
import { PickRecordListLayout } from './PickRecordListLayout';

export function PickDndRecordListLayout({
  children,
  folderId,
}: PickViewDnDItemListLayoutComponentProps) {
  return (
    <PickRecordListLayout>
      <PickListSortableContext folderId={folderId}>
        {children}
      </PickListSortableContext>
    </PickRecordListLayout>
  );
}
