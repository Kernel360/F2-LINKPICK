import type { DnDCurrentType } from '@/types';

export const isDnDCurrentData = (data: unknown): data is DnDCurrentType => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  if ('id' in data === false) {
    return false;
  }

  if ('sortable' in data === false) {
    return false;
  }

  const { sortable } = data;

  if (!sortable || typeof sortable !== 'object') {
    return false;
  }

  if ('containerId' in sortable === false) {
    return false;
  }

  if ('items' in sortable === false) {
    return false;
  }

  if (!Array.isArray(sortable.items)) {
    return false;
  }

  if ('index' in sortable === false) {
    return false;
  }

  return true;
};
