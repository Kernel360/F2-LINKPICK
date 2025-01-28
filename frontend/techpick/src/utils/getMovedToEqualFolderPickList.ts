import type { MovePicksRequestType } from '@/types/MovePicksRequestType';
import type { PickListType } from '@/types/PickListType';
import { hasIndex } from './hasIndex';

export const getMovedToEqualFolderPickList = ({
  fromPickId,
  movePicksInfo,
  prevPickList,
  toPickId,
}: GetMovedToEqualFolderPickListParamType) => {
  const curIndex = prevPickList.findIndex(
    (pickInfo) => pickInfo.id === fromPickId,
  );
  const targetIndex = prevPickList.findIndex(
    (pickInfo) => pickInfo.id === toPickId,
  );

  if (!hasIndex(curIndex) || !hasIndex(targetIndex)) {
    return prevPickList;
  }

  const nextIndex =
    curIndex < targetIndex
      ? Math.min(targetIndex + 1, prevPickList.length)
      : targetIndex;

  const movedPickSet = new Set(movePicksInfo.idList);
  const beforeNextPickList: PickListType = [];
  const movedPickList: PickListType = [];
  const afterNextPickList: PickListType = [];

  prevPickList.forEach((pickInfo, index) => {
    if (movedPickSet.has(pickInfo.id)) {
      movedPickList.push(pickInfo);
    } else if (index < nextIndex) {
      beforeNextPickList.push(pickInfo);
    } else {
      afterNextPickList.push(pickInfo);
    }
  });

  return [...beforeNextPickList, ...movedPickList, ...afterNextPickList];
};

interface GetMovedToEqualFolderPickListParamType {
  prevPickList: PickListType;
  fromPickId: number;
  toPickId: number;
  movePicksInfo: MovePicksRequestType;
}
