'use client';

import { PickViewDnDItemListLayoutComponentProps } from './DraggablePickListViewer';
import { pickCardGridLayoutStyle } from './pickCardGridLayout.css';
import { PickListSortableContext } from './PickListSortableContext';

export function PickDnDCardListLayout({
  children,
  viewType,
  folderId,
}: PickViewDnDItemListLayoutComponentProps) {
  return (
    <div className={pickCardGridLayoutStyle}>
      <PickListSortableContext folderId={folderId} viewType={viewType}>
        {children}
      </PickListSortableContext>
    </div>
  );
}
