'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePickStore } from '@/stores';
import { FetchRequestType } from '@/types/FetchRequestType';
import type { PickRecordValueType } from '@/types';

export function useFetchPickRecordByFolderId({
  folderId,
  alwaysFetch = false,
}: useFetchPickInfoParams): useFetchResult {
  const fetchPickDataByFolderId = usePickStore(
    (state) => state.fetchPickDataByFolderId
  );
  const pickRecord = usePickStore((state) => state.pickRecord);
  const isFetchedRef = useRef(false);

  const queryFunction = useCallback(
    async (folderId: number) => {
      await fetchPickDataByFolderId(folderId);
    },
    [fetchPickDataByFolderId]
  );

  useEffect(() => {
    if (!(typeof folderId === 'number')) {
      return;
    }

    if (!pickRecord[folderId] || (alwaysFetch && !isFetchedRef.current)) {
      isFetchedRef.current = true;
      queryFunction(folderId);
    }
  }, [queryFunction, folderId, pickRecord, alwaysFetch]);

  if (typeof folderId !== 'number') {
    return {
      isLoading: false,
      isError: true,
      error: 'folderId is not number',
      data: null,
      refetch: async () => {},
    };
  }

  const { isLoading, isError, data, error } = pickRecord[folderId] ?? {
    isLoading: false,
    isError: false,
    data: null,
    error: null,
  };
  return {
    isLoading,
    isError,
    error,
    data,
    refetch: async () => {
      queryFunction(folderId);
    },
  };
}

interface useFetchPickInfoParams {
  folderId: number | undefined | null;
  alwaysFetch?: boolean;
}

interface useFetchResult extends FetchRequestType<PickRecordValueType> {
  refetch: () => Promise<void>;
}
