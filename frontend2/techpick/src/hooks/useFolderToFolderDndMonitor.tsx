'use client';

import { useDndMonitor } from '@dnd-kit/core';
import { useTreeStore } from '@/stores';
import { isFolderDraggableObject } from '@/utils';
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';

/**
 * @description folder에서 folder로 dnd를 할 때의 이벤트를 감지하고 동작하는 hook입니다.
 */
export function useFolderToFolderDndMonitor() {
  const {
    getFolderInfoByFolderId,
    moveFolder,
    selectedFolderList,
    setSelectedFolderList,
    setFocusFolderId,
    setIsDragging,
    setDraggingFolderInfo,
  } = useTreeStore();

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeObject = active.data.current;

    if (!isFolderDraggableObject(activeObject)) return;

    const folderId = Number(activeObject.id);
    const folderInfo = getFolderInfoByFolderId(folderId);

    if (!folderInfo) return;

    setIsDragging(true);
    setDraggingFolderInfo(folderInfo);

    if (!selectedFolderList.includes(folderId)) {
      setFocusFolderId(folderId);
      setSelectedFolderList([folderId]);

      return;
    }

    setFocusFolderId(folderId);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (
      !isFolderDraggableObject(activeData) ||
      !isFolderDraggableObject(overData)
    ) {
      return;
    }

    // 같은 부모 containerId를 가지면 동작하지 않음.
    if (activeData.sortable.containerId === overData.sortable.containerId) {
      return;
    }

    moveFolder({
      from: active,
      to: over,
      selectedFolderList,
    });
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDragging(false);

    if (!over) return; // 드래그 중 놓은 위치가 없을 때 종료
    const activeData = active.data.current;
    const overData = over.data.current;

    if (
      !isFolderDraggableObject(activeData) ||
      !isFolderDraggableObject(overData)
    ) {
      return;
    }

    moveFolder({
      from: active,
      to: over,
      selectedFolderList,
    });
  };

  useDndMonitor({
    onDragStart: onDragStart,
    onDragOver: onDragOver,
    onDragEnd: onDragEnd,
  });
}
