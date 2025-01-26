import type { MovePicksRequestType } from '@/types/MovePicksRequestType';
import type { PickListType } from '@/types/PickListType';
import { produce } from 'immer';
import { hasIndex } from './hasIndex';

export const getMovedToEqualFolderPickList = ({
  fromPickId,
  movePicksInfo,
  prevPickList,
  toPickId,
}: GetMovedToEqualFolderPickListParamType) => {
  return produce(prevPickList, (pickList) => {
    const curIndex = pickList.findIndex(
      (pickInfo) => pickInfo.id === fromPickId,
    );
    const targetIndex = pickList.findIndex(
      (pickInfo) => pickInfo.id === toPickId,
    );

    const nextIndex =
      curIndex < targetIndex
        ? Math.min(targetIndex + 1, prevPickList.length)
        : targetIndex;

    if (!hasIndex(curIndex) || !hasIndex(nextIndex)) {
      return prevPickList;
    }

    const beforeNextPickList = prevPickList
      .slice(0, nextIndex)
      .filter((pickInfo) => !movePicksInfo.idList.includes(pickInfo.id));

    const movedPickList = prevPickList.filter((pickInfo) =>
      movePicksInfo.idList.includes(pickInfo.id),
    );

    const afterNextPickList = prevPickList
      .slice(nextIndex)
      .filter((pickInfo) => !movePicksInfo.idList.includes(pickInfo.id));

    return [...beforeNextPickList, ...movedPickList, ...afterNextPickList];
  });
};

interface GetMovedToEqualFolderPickListParamType {
  prevPickList: PickListType;
  fromPickId: number;
  toPickId: number;
  movePicksInfo: MovePicksRequestType;
}
