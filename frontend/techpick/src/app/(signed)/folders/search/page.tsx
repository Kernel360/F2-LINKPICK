'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PickListViewerInfiniteScroll } from '@/components/PickListViewer/PickListViewerInfiniteScroll';
import { usePickStore } from '@/stores/pickStore/pickStore';
import { PickListType } from '@/types';

export default function SearchPickResultPage() {
  const searchParams = useSearchParams();
  const { getSearchResult, searchPicksByQueryParam } = usePickStore();
  const [pickList, setPickList] = useState<PickListType>([]);

  const loadNextSlice = async () => {
    await searchPicksByQueryParam(
      searchParams.toString(),
      getSearchResult().lastCursor
    );
    console.log('loadModeItems', getSearchResult().content); // NOTE: debug purpose
    setPickList((prev) => prev.concat(getSearchResult().content));
  };

  return (
    <PickListViewerInfiniteScroll
      pickList={pickList}
      loadNextSlice={loadNextSlice}
    />
  );
}
