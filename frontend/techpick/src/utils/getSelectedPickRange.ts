import { hasIndex } from '@/utils';
import type { OrderedPickIdListType } from '@/types';

export const getSelectedPickRange = ({
  orderedPickIdList,
  startPickId,
  endPickId,
}: GetSelectedPickRangePayload) => {
  const firstSelectedIndex = orderedPickIdList.findIndex(
    (orderedPickId) => orderedPickId === startPickId
  );
  const lastSelectedIndex = orderedPickIdList.findIndex(
    (orderedPickId) => orderedPickId === endPickId
  );

  if (!hasIndex(firstSelectedIndex) || !hasIndex(lastSelectedIndex)) return [];

  const startIndex = Math.min(firstSelectedIndex, lastSelectedIndex);
  const endIndex = Math.max(firstSelectedIndex, lastSelectedIndex);
  const newSelectedPickIdList = orderedPickIdList.slice(
    startIndex,
    endIndex + 1
  );

  return newSelectedPickIdList;
};

interface GetSelectedPickRangePayload {
  orderedPickIdList: OrderedPickIdListType;
  startPickId: number;
  endPickId: number;
}
