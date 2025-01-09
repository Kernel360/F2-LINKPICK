import type { PickToFolderDroppableObjectType } from '@/types';

export const isPickToFolderDroppableObject = (
  data: unknown
): data is PickToFolderDroppableObjectType => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  if ('id' in data === false) {
    return false;
  }

  if (!('type' in data && data.type === 'folder')) {
    return false;
  }

  return true;
};
