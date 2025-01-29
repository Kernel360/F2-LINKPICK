import type { PickIdOrderedListType } from '@/types/PickIdOrderedListType';
import type { PickInfoRecordType } from '@/types/PickInfoRecordType';
import type { PickListType } from '@/types/PickListType';

export const generatePickRecordData = (pickList: PickListType) => {
  const pickIdOrderedList: PickIdOrderedListType = [];
  const pickInfoRecord = {} as PickInfoRecordType;

  for (const pickInfo of pickList) {
    pickIdOrderedList.push(pickInfo.id);
    pickInfoRecord[`${pickInfo.id}`] = pickInfo;
  }

  return { pickIdOrderedList, pickInfoRecord };
};
