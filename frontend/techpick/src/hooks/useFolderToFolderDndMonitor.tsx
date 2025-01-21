'use client';

import { useFetchFolders } from '@/queries/useFetchFolders';
import { useMoveFolders } from '@/queries/useMoveFolders';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { getFolderInfoByFolderId } from '@/utils/getFolderInfoByFolderId';
import { isFolderDraggableObject } from '@/utils/isFolderDraggableObject';
import { useDndMonitor } from '@dnd-kit/core';
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
    selectedFolderList,
    setSelectedFolderList,
    setFocusFolderId,
    setIsDragging,
    setDraggingFolderInfo,
  } = useTreeStore();
  const { mutateAsync: moveFolders } = useMoveFolders();
  const { data: folderRecord } = useFetchFolders();

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeObject = active.data.current;

    if (!isFolderDraggableObject(activeObject)) return;

    const folderId = Number(activeObject.id);
    const folderInfo = getFolderInfoByFolderId({ folderId, folderRecord });

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

    moveFolders({
      fromId: Number(activeData.id),
      toId: Number(overData.id),
      destinationFolderId: Number(overData.sortable.containerId),
      parentFolderId: Number(activeData.sortable.containerId),
      orderIdx: overData.sortable.index,
      idList: selectedFolderList,
    });
  };

  const onDragEnd = async (event: DragEndEvent) => {
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

    await moveFolders({
      fromId: Number(activeData.id),
      toId: Number(overData.id),
      destinationFolderId: Number(overData.sortable.containerId),
      parentFolderId: Number(activeData.sortable.containerId),
      orderIdx: overData.sortable.index,
      idList: selectedFolderList,
    });

    const selectedListLastFolderId =
      selectedFolderList[selectedFolderList.length - 1];
    const id = `#folderId-${selectedListLastFolderId}`;
    const targetElement = document.querySelector(id);
    if (targetElement) {
      targetElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  };

  useDndMonitor({
    onDragStart: onDragStart,
    onDragOver: onDragOver,
    onDragEnd: onDragEnd,
  });
}
