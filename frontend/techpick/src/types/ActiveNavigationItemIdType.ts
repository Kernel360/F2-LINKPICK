import type { FolderIdType } from './FolderIdType';

export type ActiveNavigationItemIdType =
  | FolderIdType
  | 'recommend'
  | 'mypage'
  | null
  | undefined;
