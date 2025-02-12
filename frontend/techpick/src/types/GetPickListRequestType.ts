import type { FolderIdType } from './FolderIdType';

export type GetPickListRequestType = {
  folderId: FolderIdType;
  cursor: number;
  size: number;
};
