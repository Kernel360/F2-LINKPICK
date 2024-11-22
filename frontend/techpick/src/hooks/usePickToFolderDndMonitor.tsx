'use client';

import { useDndMonitor } from '@dnd-kit/core';
import { usePickStore, useTreeStore } from '@/stores';
import { isPickDraggableObject, isPickToFolderDroppableObject } from '@/utils';
import type { DragEndEvent, DragOverEvent } from '@dnd-kit/core';

/**
 * @description pick에서 folder로 dnd를 할 때의 이벤트를 감지하고 동작하는 hook입니다.
 */
export function usePickToFolderDndMonitor() {
  const { setHoverFolderId } = useTreeStore();
  const { movePicksToDifferentFolder } = usePickStore();

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return; // 드래그 중 놓은 위치가 없을 때 종료

    const activeObject = active.data.current;
    const overObject = over.data.current;

    if (
      !isPickDraggableObject(activeObject) ||
      !isPickToFolderDroppableObject(overObject)
    )
      return;

    const currentHoverFolderId = Number(overObject.id);

    setHoverFolderId(currentHoverFolderId);
  };

  const onDragEnd = (event: DragEndEvent) => {
    setHoverFolderId(null);

    const { active, over } = event;
    if (!over) return; // 드래그 중 놓은 위치가 없을 때 종료

    const activeObject = active.data.current;
    const overObject = over.data.current;

    if (
      !isPickDraggableObject(activeObject) ||
      !isPickToFolderDroppableObject(overObject)
    )
      return;

    const pickParentFolderId = activeObject.parentFolderId;
    const folderId = overObject.id;

    if (pickParentFolderId === folderId) {
      return;
    }

    movePicksToDifferentFolder({ from: activeObject, to: overObject });
  };

  useDndMonitor({
    onDragOver,

    onDragEnd,
  });
}
