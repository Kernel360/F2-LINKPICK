import type { BasicFolderClassificationType } from './BasicFolderClassificationType';
import type { FolderType } from './FolderType';

export type BasicFolderRecordType = Record<
  BasicFolderClassificationType,
  FolderType
>;
