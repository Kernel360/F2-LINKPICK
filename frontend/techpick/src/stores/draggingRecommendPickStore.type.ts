import { RecommendPickType } from '@/types';

export type DraggingRecommendPickState = {
  isDragging: boolean;
  draggingRecommendPickInfo: RecommendPickType | null | undefined;
};

export type DraggingRecommendPickAction = {
  setIsDragging: (isDragging: boolean) => void;
  setDraggingPickInfo: (
    draggingRecommendPickInfo: RecommendPickType | null | undefined
  ) => void;
};
