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
    movePicks,
    selectedPickIdList,
    selectSinglePick,
    setIsDragging,
    setFocusedPickId,
  } = usePickStore();
  const focusFolderId = useTreeStore((state) => state.focusFolderId);

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeObject = active.data.current;

    if (!isPickDraggableObject(activeObject)) return;

    setIsDragging(true);

    const pickId = Number(active.id);

    if (!selectedPickIdList.includes(pickId)) {
      selectSinglePick(pickId);
      return;
    }

    setFocusedPickId(pickId);
  };

  const onDragEnd = (event: DragEndEvent) => {
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

    console.log('usePickToPickDndMonitor onDragEnd work!');

    movePicks({ folderId: focusFolderId, from: active, to: over });
    setIsDragging(false);
  };

  useDndMonitor({
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
  });
}
