import { DnDCurrentType } from './dnd.type';
import type { UniqueIdentifier } from '@dnd-kit/core';

export interface PickDraggableObjectType extends DnDCurrentType {
  type: 'pick';
  parentFolderId: number;
  sortable: {
    containerId: string | null;
    items: UniqueIdentifier[];
    index: number;
  };
}
