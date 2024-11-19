'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PickListViewerInfiniteScroll } from '@/components/PickListViewer/PickListViewerInfiniteScroll';
import { usePickStore } from '@/stores/pickStore/pickStore';
import { PickListType } from '@/types';

export default function SearchPickResultPage() {
  const searchParams = useSearchParams();
  const { getSearchResult, searchPicksByQueryParam } = usePickStore();
  const [pickList, setPickList] = useState<PickListType>([]);

  useEffect(() => {
    setPickList([]);
    (async () => {
      await loadNextSlice();
    })(/*IIFE*/);
  }, [searchParams]);

  const loadNextSlice = async () => {
    await searchPicksByQueryParam(
      searchParams.toString(),
      getSearchResult().lastCursor
    );
    setPickList((prev) => prev.concat(getSearchResult().content));
  };

  return (
    <PickListViewerInfiniteScroll
      pickList={pickList}
      loadNextSlice={loadNextSlice}
    />
  );
}
