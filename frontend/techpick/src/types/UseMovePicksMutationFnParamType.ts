import type { FolderIdType } from './FolderIdType';
import type { MovePicksRequestType } from './MovePicksRequestType';

export interface UseMovePicksMutationFnParamType {
  sourceFolderId: FolderIdType;
  fromPickId: number;
  toPickId: number;
  movePicksInfo: MovePicksRequestType;
}
