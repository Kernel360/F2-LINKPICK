'use client';

import type { PickViewDnDItemListLayoutComponentProps } from './DraggablePickListViewer';
import { PickListSortableContext } from './PickListSortableContext';
import { pickCardGridLayoutStyle } from './pickCardGridLayout.css';

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
