'use client';

import { PickViewDnDItemListLayoutComponentProps } from './DraggablePickListViewer';
import { PickCardDropZone } from './PickCardDropZone';
import { pickCardGridLayoutStyle } from './pickCardGridLayout.css';

export function PickDnDCardListLayout({
  children,
  folderId,
}: PickViewDnDItemListLayoutComponentProps) {
  return (
    <div className={pickCardGridLayoutStyle}>
      <PickCardDropZone folderId={folderId}>{children}</PickCardDropZone>
    </div>
  );
}
