import type { CSSProperties, PropsWithChildren } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { RecommendPickCategoryType, RecommendPickType } from '@/types';

export function RecommendPickDraggable({
  recommendPick,
  recommendPickCategoryType,
  children,
}: PropsWithChildren<RecommendPickDraggableProps>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `recommend-${recommendPickCategoryType}-${recommendPick.url}`,
    data: {
      ...recommendPick,
      type: 'recommend',
    },
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {children}
    </div>
  );
}

interface RecommendPickDraggableProps {
  recommendPick: RecommendPickType;
  recommendPickCategoryType: RecommendPickCategoryType;
}
