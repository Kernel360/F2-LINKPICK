'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PickListViewer } from '@/components';
import { usePickStore } from '@/stores/pickStore/pickStore';

export default function SearchPickResultPage() {
  const searchParams = useSearchParams();
  const {
    fetchPickDataByQueryParam,
    getOrderedPickListByFolderId,
    getRecentlyFetchedFolderIdList,
  } = usePickStore();

  useEffect(
    function loadPickDataFromUrlPath() {
      fetchPickDataByQueryParam(searchParams.toString());
    },
    [fetchPickDataByQueryParam, searchParams]
  );

  /**
   * usePickStore의 구조를 그대로 활용하기 위해
   * folderId 기반 record를 탐색하는 식으로 구현함.
   */
  const getSearchedPickList = () =>
    getRecentlyFetchedFolderIdList().flatMap((folderId) =>
      getOrderedPickListByFolderId(folderId)
    );

  return <PickListViewer pickList={getSearchedPickList()} />;
}
