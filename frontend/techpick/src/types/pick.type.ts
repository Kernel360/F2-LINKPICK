import type { FetchRequestType } from './FetchRequestType';
import type { Concrete } from './util.type';
import type { components } from '@/schema';

export type PickInfoType = Concrete<
  components['schemas']['baguni.api.application.pick.dto.PickApiResponse$Pick']
>;

export type PickInfoRecordType = {
  [pickId: string]: PickInfoType | null | undefined;
};

export type PickIdOrderedListType = number[];

export type PickSelectionResult = {
  pickIdOrderedList: PickIdOrderedListType;
  pickInfoRecord: PickInfoRecordType;
};

export type PickRecordValueType = {
  pickIdOrderedList: PickIdOrderedListType;
  pickInfoRecord: PickInfoRecordType;
};

export type PickRecordType = {
  [folderId: string]: FetchRequestType<PickRecordValueType> | undefined;
};

export type PickListType = PickInfoType[];

export type GetPicksResponseType = {
  folderId: number;
  pickList: PickListType;
}[];

export type SearchPicksResponseType = {
  content: PickListType;
  lastCursor: number;
  size: number;
  hasNext: boolean;
};

export type OrderedPickIdListType = number[];
export type SelectedPickIdListType = number[];

export type MovePicksRequestType =
  components['schemas']['baguni.api.application.pick.dto.PickApiRequest$Move'];

type ConcreteType<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

export type CreatePickRequestType = ConcreteType<
  components['schemas']['baguni.api.application.pick.dto.PickApiRequest$Create']
>;

export type GetPickByUrlResponseType = ConcreteType<
  components['schemas']['baguni.api.application.pick.dto.PickApiResponse$Pick']
>;

export type GetLinkOgTagDataResponseType = {
  title: string;
  description: string;
  imageUrl: string;
};

export type CreatePickResponseType = ConcreteType<
  components['schemas']['baguni.api.application.pick.dto.PickApiResponse$Pick']
>;
