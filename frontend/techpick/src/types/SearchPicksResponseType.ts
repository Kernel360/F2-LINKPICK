import type { PickListType } from './PickListType';

export interface SearchPicksResponseType {
  content: PickListType;
  lastCursor: number;
  size: number;
  hasNext: boolean;
}
