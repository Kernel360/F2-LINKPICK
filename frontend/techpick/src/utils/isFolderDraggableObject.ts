import type { FolderDraggableObjectType } from '@/types/FolderDraggableObjectType';

export const isFolderDraggableObject = (
  data: unknown,
): data is FolderDraggableObjectType => {
  if (
    !data ||
    typeof data !== 'object' ||
    !('id' in data) ||
    !('type' in data && data.type === 'folder') ||
    !('sortable' in data)
  ) {
    return false;
  }

  const { sortable } = data as { sortable: unknown };

  if (
    !sortable ||
    typeof sortable !== 'object' ||
    !('containerId' in sortable) ||
    !('items' in sortable && Array.isArray(sortable.items)) ||
    !('index' in sortable)
  ) {
    return false;
  }

  return true;
};
