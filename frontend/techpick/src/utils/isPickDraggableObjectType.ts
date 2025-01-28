import type { PickDraggableObjectType } from '@/types/PickDraggableObjectType';

export const isPickDraggableObject = (
  data: unknown,
): data is PickDraggableObjectType => {
  if (
    typeof data !== 'object' ||
    data === null ||
    !('id' in data) ||
    !('type' in data) ||
    data.type !== 'pick' ||
    !('parentFolderId' in data) ||
    !('sortable' in data) ||
    !('pickInfo' in data)
  ) {
    return false;
  }

  const { sortable } = data;

  return (
    typeof sortable === 'object' &&
    sortable !== null &&
    'containerId' in sortable &&
    'items' in sortable &&
    Array.isArray(sortable.items) &&
    'index' in sortable
  );
};
