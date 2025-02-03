import type { RecommendPickCategoryType } from '@/types/RecommendPickCategoryType';
import type { RecommendPickType } from '@/types/RecommendPickType';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { CSSProperties, PropsWithChildren } from 'react';
import { draggableStyle } from './recommendPickDraggable.css';
export function RecommendPickDraggable({
  recommendPick,
  recommendPickCategoryType,
  children,
}: PropsWithChildren<RecommendPickDraggableProps>) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
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
    <div
      id={`recommend-${recommendPickCategoryType}-${recommendPick.url}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={isDragging ? draggableStyle : ''}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}

interface RecommendPickDraggableProps {
  recommendPick: RecommendPickType;
  recommendPickCategoryType: RecommendPickCategoryType;
}
