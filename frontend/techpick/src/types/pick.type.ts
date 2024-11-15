import type { Concrete } from './util.type';
import type { components } from '@/schema';

export type PickInfoType = Concrete<
  components['schemas']['techpick.api.application.pick.dto.PickApiResponse$Pick']
>;

export type PickInfoRecordType = {
  [pickId: string]: PickInfoType | undefined;
};

export type PickIdOrderedListType = number[];

export type PickRecordValueType = {
  pickIdOrderedList: PickIdOrderedListType;
  pickInfoRecord: PickInfoRecordType;
};

export type PickRecordType = {
  [folderId: string]: PickRecordValueType | undefined;
};

export type PickListType = PickInfoType[];

export type GetPicksResponseType = {
  folderId: number;
  pickList: PickListType;
}[];

export type OrderedPickIdListType = number[];
export type SelectedPickIdListType = number[];

export type MovePicksRequestType =
  components['schemas']['techpick.api.application.pick.dto.PickApiRequest$Move'];
