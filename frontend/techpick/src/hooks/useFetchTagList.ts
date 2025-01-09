import { useEffect } from 'react';
import { useTagStore } from '@/stores';

export function useFetchTagList() {
  const fetchingTagList = useTagStore((state) => state.fetchingTagList);

  useEffect(
    function fetchingTagListFromRemote() {
      fetchingTagList();
    },
    [fetchingTagList]
  );
}
