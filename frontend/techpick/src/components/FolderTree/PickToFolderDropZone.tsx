'use client';

import type { PropsWithChildren } from 'react';
import { useDroppable } from '@dnd-kit/core';

export function PickToFolderDropZone({
  folderId,
  children,
}: PropsWithChildren<PickToFolderDropZoneProps>) {
  const { setNodeRef } = useDroppable({
    id: `folder-${folderId}`,
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
