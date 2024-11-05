import type { Concrete } from './uitl.type';
import type { UniqueIdentifier } from '@dnd-kit/core';
import type { components } from '@/schema';

export type SelectedFolderListType = number[];

export type ChildFolderListType = number[];

export type FolderType = {
  id: number;
  name: string;
  parentFolderId: number;
  childFolderList: ChildFolderListType;
};

export type FolderMapType = Record<string, FolderType>;

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
