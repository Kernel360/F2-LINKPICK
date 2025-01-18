import type { RecommendPickType } from '@/types/RecommendPickType';

export type DraggingRecommendPickState = {
  isDragging: boolean;
  draggingRecommendPickInfo: RecommendPickType | null | undefined;
};

export type DraggingRecommendPickAction = {
  setIsDragging: (isDragging: boolean) => void;
  setDraggingPickInfo: (
    draggingRecommendPickInfo: RecommendPickType | null | undefined,
  ) => void;
};
