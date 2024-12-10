import { RecommendPickType } from '@/types';

export type RecommendPickState = {
  isDragging: boolean;
  draggingRecommendPickInfo: RecommendPickType | null | undefined;
};

export type RecommendPickAction = {
  setIsDragging: (isDragging: boolean) => void;
  setDraggingPickInfo: (
    draggingRecommendPickInfo: RecommendPickType | null | undefined
  ) => void;
};
