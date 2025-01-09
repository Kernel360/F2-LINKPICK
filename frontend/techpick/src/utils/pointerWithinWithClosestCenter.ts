'use client';

import { pointerWithin, closestCenter } from '@dnd-kit/core';
import type { CollisionDetection } from '@dnd-kit/core';

/**
 * dnd-kit의 충돌 알고리즘을 custom 합니다.
 * pointerWithin을 수행하고 만약 마우스가 있는 영역에 Dropzone이 없으면 closestCenter가 동작합니다.
 */
export const pointerWithinWithClosestCenter: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);

  if (pointerCollisions.length > 0) {
    return pointerCollisions;
  }

  return closestCenter(args);
};
