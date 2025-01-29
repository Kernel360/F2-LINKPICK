'use client';
import { useMovePicksToDifferentFolder } from '@/queries/useMovePicksToDifferentFolder';
import { usePickStore } from '@/stores/pickStore';
import { isPickDraggableObject } from '@/utils/isPickDraggableObjectType';
import { isPickToFolderDroppableObject } from '@/utils/isPickToFolderDroppableObject';
import { notifySuccess } from '@/utils/toast';
import { useDndMonitor } from '@dnd-kit/core';
import type { DragEndEvent, DragOverEvent } from '@dnd-kit/core';

/**
 * @description pick에서 folder로 dnd를 할 때의 이벤트를 감지하고 동작하는 hook입니다.
 */
export function usePickToFolderDndMonitor() {
  const { mutate: movePicksToDifferentFolder } =
    useMovePicksToDifferentFolder();
  const selectedPickIdList = usePickStore((state) => state.selectedPickIdList);

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
  };

  const onDragEnd = async (event: DragEndEvent) => {
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

    movePicksToDifferentFolder(
      {
        fromPickId: Number(activeObject.id),
        sourceFolderId: activeObject.parentFolderId,
        movePicksInfo: {
          idList: selectedPickIdList,
          destinationFolderId: overObject.id,
        },
      },
      {
        onSuccess: () => {
          notifySuccess('다른 폴더로 북마크를 이동했습니다!');
        },
      },
    );
  };

  useDndMonitor({
    onDragOver,
    onDragEnd,
  });
}
