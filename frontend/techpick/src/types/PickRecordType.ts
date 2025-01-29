import type { FolderIdType } from './FolderIdType';
import type { PickListType } from './PickListType';

export interface PickRecordType {
  [folderId: FolderIdType]: PickListType | undefined;
}
