'use client';

import { getFolderSortableContextId } from '@/utils/getFolderSortableContextId';
import { useDroppable } from '@dnd-kit/core';
import type { PropsWithChildren } from 'react';

export function PickToFolderDropZone({
  folderId,
  children,
}: PropsWithChildren<PickToFolderDropZoneProps>) {
  const { setNodeRef } = useDroppable({
    id: getFolderSortableContextId(folderId),
    data: {
      id: folderId,
      type: 'folder',
    },
  });

  return <div ref={setNodeRef}>{children}</div>;
}

interface PickToFolderDropZoneProps {
  folderId: number;
}
