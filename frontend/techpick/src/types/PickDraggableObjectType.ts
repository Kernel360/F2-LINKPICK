import type { UniqueIdentifier } from '@dnd-kit/core';
import type { DnDCurrentType } from './DnDCurrentType';
import type { PickInfoType } from './PickInfoType';

export interface PickDraggableObjectType extends DnDCurrentType {
  type: 'pick';
  parentFolderId: number;
  pickInfo: PickInfoType;
  sortable: {
    containerId: string | null;
    items: UniqueIdentifier[];
    index: number;
  };
}
