'use client';

import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { usePickStore } from '@/stores/pickStore/pickStore';
import { useSearchPickStore } from '@/stores/searchPickStore';
import { isPickDraggableObject } from '@/utils/isPickDraggableObjectType';
import { isPickToFolderDroppableObject } from '@/utils/isPickToFolderDroppableObject';
import { notifySuccess } from '@/utils/toast';
import { useDndMonitor } from '@dnd-kit/core';
import type { DragEndEvent, DragOverEvent } from '@dnd-kit/core';

/**
 * @description pick에서 folder로 dnd를 할 때의 이벤트를 감지하고 동작하는 hook입니다.
 */
export function usePickToFolderDndMonitor() {
  const { setHoverFolderId } = useTreeStore();
  const { movePicksToDifferentFolder } = usePickStore();
  const { preFetchSearchPicks } = useSearchPickStore();

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

  const onDragEnd = async (event: DragEndEvent) => {
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

    await movePicksToDifferentFolder({ from: activeObject, to: overObject });
    notifySuccess('다른 폴더로 북마크를 이동했습니다!');
    await preFetchSearchPicks();
  };

  useDndMonitor({
    onDragOver,

    onDragEnd,
  });
}
