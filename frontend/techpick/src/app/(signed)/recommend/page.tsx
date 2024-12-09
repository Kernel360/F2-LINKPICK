'use client';

import { useEffect } from 'react';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import {
  useClearSelectedPickIdsOnMount,
  useResetPickFocusOnOutsideClick,
} from '@/hooks';
import { useTreeStore } from '@/stores';
import { RecommendLoadingPage } from './RecommendLoadingPage';

/**
 * Root 폴더가 Home의 역할을 합니다.
 */
export default function RootFolderPage() {
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);
  const basicFolderMap = useTreeStore((state) => state.basicFolderMap);
  useResetPickFocusOnOutsideClick();
  useClearSelectedPickIdsOnMount();

  useEffect(
    function selectRootFolderId() {
      if (!basicFolderMap) {
        return;
      }

      selectSingleFolder(basicFolderMap['ROOT'].id);
    },
    [basicFolderMap, selectSingleFolder]
  );

  if (!basicFolderMap ) {
    return <RecommendLoadingPage />;
  }


  return (
    <FolderContentLayout>

    </FolderContentLayout>
  );
}
