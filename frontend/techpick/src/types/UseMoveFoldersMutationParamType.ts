import type { MoveFolderRequestType } from './MoveFolderRequestType';

export interface UseMoveFoldersMutationParamType extends MoveFolderRequestType {
  fromId: number;
  toId: number;
}
