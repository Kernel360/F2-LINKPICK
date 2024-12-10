'use client';

import { useDndMonitor } from '@dnd-kit/core';
import { createPick } from '@/apis/pick/createPick';
import {
  usePickStore,
  useDraggingRecommendPickStore,
  useTreeStore,
} from '@/stores';
import {
  isPickToFolderDroppableObject,
  isRecommendPickDraggableObject,
  notifySuccess,
} from '@/utils';
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';

/**
 * @description 추천 목록에서 folder로 dnd를 할 때의 이벤트를 감지하고 동작하는 hook입니다.
 */
export function useRecommendPickToFolderDndMonitor() {
  const { setHoverFolderId } = useTreeStore();
  const { insertPickInfo } = usePickStore();
  const { setIsDragging, setDraggingPickInfo } =
    useDraggingRecommendPickStore();

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeObject = active.data.current;

    if (!isRecommendPickDraggableObject(activeObject)) {
      return;
    }

    setIsDragging(true);
    setDraggingPickInfo(activeObject);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return; // 드래그 중 놓은 위치가 없을 때 종료

    const activeObject = active.data.current;
    const overObject = over.data.current;

    if (
      !isRecommendPickDraggableObject(activeObject) ||
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
      !isRecommendPickDraggableObject(activeObject) ||
      !isPickToFolderDroppableObject(overObject)
    )
      return;

    const { url, title, imageUrl, description } = activeObject;

    try {
      const createdPickInfo = await createPick({
        title,
        parentFolderId: overObject.id,
        tagIdOrderedList: [],
        linkInfo: { url, description, imageUrl, title },
      });
      insertPickInfo(createdPickInfo, overObject.id);
      notifySuccess('성공적으로 추가되었습니다!');
    } catch {
      /** empty */
    }
  };

  useDndMonitor({
    onDragStart: onDragStart,
    onDragOver: onDragOver,
    onDragEnd: onDragEnd,
  });
}
