import type { Concrete } from './uitl.type';
import type { UniqueIdentifier } from '@dnd-kit/core';
import type { components } from '@/schema';

export type SelectedFolderListType = number[];

export type ChildFolderListType = number[];

export type DnDCurrentType = {
  id: UniqueIdentifier;
  sortable: {
    containerId: string | null;
    items: UniqueIdentifier[];
    index: number;
  };
};

export type GetFolderListResponseType = Concrete<
  components['schemas']['techpick.api.application.folder.dto.FolderApiResponse']
>[];

export type CreateFolderRequestType =
  components['schemas']['techpick.api.application.folder.dto.FolderApiRequest$Create'];

export type CreateFolderResponseType = Concrete<
  components['schemas']['techpick.api.application.folder.dto.FolderApiResponse']
>;

export type DeleteFolderRequestType =
  components['schemas']['techpick.api.application.folder.dto.FolderApiRequest$Delete'];

export type UpdateFolderRequestType =
  components['schemas']['techpick.api.application.folder.dto.FolderApiRequest$Update'];

export type MoveFolderRequestType = Concrete<
  components['schemas']['techpick.api.application.folder.dto.FolderApiRequest$Move']
>;

export type GetBasicFolderListType = Concrete<
  components['schemas']['techpick.api.application.folder.dto.FolderApiResponse']
>[];

export type FolderType = Concrete<
  components['schemas']['techpick.api.application.folder.dto.FolderApiResponse']
>;

export type FolderClassificationType = NonNullable<
  components['schemas']['techpick.api.application.folder.dto.FolderApiResponse']['folderType']
>;

export type BasicFolderClassificationType = Exclude<
  FolderClassificationType,
  'GENERAL'
>;

export type BasicFolderMap = Record<BasicFolderClassificationType, FolderType>;

export type FolderMapType = Record<string, FolderType>;
