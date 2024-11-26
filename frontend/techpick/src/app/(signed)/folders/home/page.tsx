'use client';

import { useEffect } from 'react';
import {
  useClearSelectedPickIdsOnMount,
  useResetPickFocusOnOutsideClick,
} from '@/hooks';
import { useTreeStore } from '@/stores';

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

  if (!basicFolderMap) {
    return <div>loading...</div>;
  }

  {
    /*  TODO: 여기에 설명서, 홈 화면을 처음에 그려줍니다. */
  }
  return (
    <div style={{ marginLeft: '36px' }}>
      <h1>잠시만 기다려 주세요. 준비중입니다!</h1>
    </div>
  );
}
