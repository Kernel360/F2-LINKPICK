import type { UniqueIdentifier } from '@dnd-kit/core';
import type { DnDCurrentType } from './DnDCurrentType';

export interface PickDraggableObjectType extends DnDCurrentType {
  type: 'pick';
  parentFolderId: number;
  sortable: {
    containerId: string | null;
    items: UniqueIdentifier[];
    index: number;
  };
}
