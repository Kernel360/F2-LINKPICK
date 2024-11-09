import { NodeData } from '@/types/NodeData';

export interface ApiDefaultFolderIdData {
  userId: number;
  RECYCLE_BIN: number;
  UNCLASSIFIED: number;
  ROOT: number;
}

export interface ApiStructureData {
  root: NodeData[];
  recycleBin: NodeData[];
  unclassified?: NodeData[];
}

export interface ApiFolderData {
  id: number;
  name: string;
  parentFolderId: number;
  userId: number;
}

export interface ApiTagData {
  tagId: number;
  tagName: string;
  tagOrder: number;
  colorNumber: number;
  userId: number;
}

export interface ApiLinkUrlData {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
  invalidatedAt: string;
}

export interface ApiPickData {
  id: number;
  title: string;
  memo: string;
  linkInfo: ApiLinkUrlData;
  parentFolderId: number;
  tagOrderList: number[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiPickLinkRequestData {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ApiPickRequestType {
  memo: string;
  title: string;
  tagIdList: number[];
  linkRequest: ApiPickLinkRequestData;
}
