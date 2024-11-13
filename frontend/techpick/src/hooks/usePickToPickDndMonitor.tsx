'use client';

import { useDndMonitor } from '@dnd-kit/core';
import { usePickStore, useTreeStore } from '@/stores';
import { isPickDraggableObject } from '@/utils';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

/**
 * @description pick에서 pick으로 dnd를 할 때의 이벤트를 감지하고 동작하는 hook입니다.
 */
export function usePickToPickDndMonitor() {
  const {
    movePicksToEqualFolder,
    selectedPickIdList,
    selectSinglePick,
    setIsDragging,
    setFocusedPickId,
    getPickInfoByFolderIdAndPickId,
    setDraggingPickInfo,
  } = usePickStore();
  const focusFolderId = useTreeStore((state) => state.focusFolderId);

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeObject = active.data.current;

    if (!isPickDraggableObject(activeObject)) return;

    const pickId = Number(activeObject.id);
    const parentFolderId = activeObject.parentFolderId;
    const pickInfo = getPickInfoByFolderIdAndPickId(parentFolderId, pickId);
    setIsDragging(true);
    setDraggingPickInfo(pickInfo);

    if (!selectedPickIdList.includes(pickId)) {
      selectSinglePick(pickId);
      return;
    }

    setFocusedPickId(pickId);
  };

  const onDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    setDraggingPickInfo(null);

    const { active, over } = event;
    if (!over) return; // 드래그 중 놓은 위치가 없을 때 종료
    if (!focusFolderId) return;

    const activeObject = active.data.current;
    const overObject = over.data.current;

    if (
      !isPickDraggableObject(activeObject) ||
      !isPickDraggableObject(overObject)
    )
      return;

    movePicksToEqualFolder({ folderId: focusFolderId, from: active, to: over });
  };

  useDndMonitor({
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
  });
}
