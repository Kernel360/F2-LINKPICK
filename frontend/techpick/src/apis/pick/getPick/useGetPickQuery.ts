import type { PickInfoType } from '@/types/PickInfoType';
import { useQuery } from '@tanstack/react-query';
import { getPick } from './getPick';

// todo: suspense query로 바꾸기.
export const useGetPickQuery = (pickId: number) => {
  return useQuery<PickInfoType>({
    queryKey: ['pick', pickId],
    queryFn: () => {
      return getPick(pickId);
    },
  });
};
