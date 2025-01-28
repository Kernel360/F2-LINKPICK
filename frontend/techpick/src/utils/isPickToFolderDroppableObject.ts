import type { PickToFolderDroppableObjectType } from '@/types/PickToFolderDroppableObjectType';

export const isPickToFolderDroppableObject = (
  data: unknown,
): data is PickToFolderDroppableObjectType => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const { id, type } = data as Record<string, unknown>;

  return typeof id !== 'undefined' && type === 'folder';
};
