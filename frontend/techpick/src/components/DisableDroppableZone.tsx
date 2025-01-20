'use client';

import { useDroppable } from '@dnd-kit/core';
import type { PropsWithChildren } from 'react';

/**
 * 현재 pointerWithinWithClosestCenter에서 마우스에 정확한 위치가 없으면 가장 가까운 드롭가능한 곳에 놓아지고 드롭 이벤트가 발생하곤 합니다.
 *
 * 따라서 이벤트가 발생하지 않아야한다면면 해당 컴포넌트로 페이지를 감싸야합니다.
 *
 * @param id id는 고유해야합니다. 따라서 pick이나 folder의 id와 겹치지 않도록 string으로 하거나 음수값을 이용하는 걸 권장합니다.
 * @returns
 */
export function DisableDroppableZone({
  id,
  children,
}: PropsWithChildren<DisableDroppableZoneProps>) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: 'disable',
    },
  });

  return <div ref={setNodeRef}>{children}</div>;
}

type DisableDroppableZoneProps = {
  id: string | number;
};
