'use client';
import { useMovePicksToEqualFolder } from '@/queries/useMovePicksToEqualFolder';
import { usePickStore } from '@/stores/pickStore';
import { isPickDraggableObject } from '@/utils/isPickDraggableObjectType';
import { useDndMonitor } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useGetActiveNavigationItemId } from './useGetActiveNavigationItemId';

/**
 * @description pick에서 pick으로 dnd를 할 때의 이벤트를 감지하고 동작하는 hook입니다.
 */
export function usePickToPickDndMonitor() {
  const selectedPickIdList = usePickStore((state) => state.selectedPickIdList);
  const selectSinglePick = usePickStore((state) => state.selectSinglePick);
  const setIsDragging = usePickStore((state) => state.setIsDragging);
  const setFocusedPickId = usePickStore((state) => state.setFocusedPickId);
  const setDraggingPickInfo = usePickStore(
    (state) => state.setDraggingPickInfo,
  );
  const { mutate: movePicksToEqualFolder } = useMovePicksToEqualFolder();
  const { activeNavigationItemId } = useGetActiveNavigationItemId();
  const folderId = Number.isNaN(activeNavigationItemId)
    ? null
    : Number(activeNavigationItemId);

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const activeObject = active.data.current;

    if (!isPickDraggableObject(activeObject)) return;

    const pickId = Number(activeObject.id);
    const pickInfo = activeObject.pickInfo;
    setFocusedPickId(pickId);
    setIsDragging(true);
    setDraggingPickInfo(pickInfo);

    if (!selectedPickIdList.includes(pickId)) {
      selectSinglePick(pickId);
      return;
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setIsDragging(false);
    setDraggingPickInfo(null);

    if (!over) return; // 드래그 중 놓은 위치가 없을 때 종료
    if (!folderId) return;

    const activeObject = active.data.current;
    const overObject = over.data.current;

    if (
      !isPickDraggableObject(activeObject) ||
      !isPickDraggableObject(overObject)
    )
      return;

    movePicksToEqualFolder(
      {
        fromPickId: Number(activeObject.id),
        sourceFolderId: activeObject.parentFolderId,
        toPickId: Number(overObject.id),
        movePicksInfo: {
          idList: selectedPickIdList,
          destinationFolderId: activeObject.parentFolderId,
          orderIdx: overObject.sortable.index,
        },
      },
      {},
    );
  };

  useDndMonitor({
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
  });
}
