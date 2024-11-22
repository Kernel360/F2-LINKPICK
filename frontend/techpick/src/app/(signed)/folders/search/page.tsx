'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PickListViewerInfiniteScroll } from '@/components/PickListViewer/PickListViewerInfiniteScroll';
import { usePickStore } from '@/stores/pickStore/pickStore';
import { PickListType } from '@/types';

export default function SearchPickResultPage() {
  const searchParams = useSearchParams();
  const { getSearchResult, searchPicksByQueryParam } = usePickStore();
  const [pickList, setPickList] = useState<PickListType>([]);
  const isLoadFirst = useRef(true);

  const loadNextSlice = useCallback(async () => {
    await searchPicksByQueryParam(
      searchParams.toString(),
      getSearchResult().lastCursor
    );
    setPickList((prev) => prev.concat(getSearchResult().content));
  }, [getSearchResult, searchParams, searchPicksByQueryParam]);

  useEffect(() => {
    if (isLoadFirst.current) {
      isLoadFirst.current = false;
      setPickList([]);
      (async () => {
        await loadNextSlice();
      })(/*IIFE*/);
    }
  }, [loadNextSlice, searchParams]);

  return (
    <PickListViewerInfiniteScroll
      pickList={pickList}
      loadNextSlice={loadNextSlice}
    />
  );
}
