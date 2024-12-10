import { RecommendPickType } from '@/types';

export const isRecommendPickDraggableObject = (
  data: unknown
): data is RecommendPickType => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  if (!('type' in data && data.type === 'recommend')) {
    return false;
  }

  if (!('count' in data)) {
    return false;
  }

  if (!('description' in data)) {
    return false;
  }

  if (!('title' in data)) {
    return false;
  }

  if (!('imageUrl' in data)) {
    return false;
  }

  if (!('url' in data)) {
    return false;
  }

  return true;
};
