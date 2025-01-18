import type { FolderClassificationType } from './FolderClassificationType';

export type BasicFolderClassificationType = Exclude<
  FolderClassificationType,
  'GENERAL'
>;
