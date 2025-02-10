'use client';

import { MobilePickInfiniteScrollList } from '@/components/MobilePickInfiniteScrollList';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { mobileFolderDetailPageStyle } from './mobileFolderDetailPage.css';

export function MobileFolderDetailPage() {
  const { folderId: stringFolderId } = useParams<{ folderId: string }>();
  const folderId = useMemo(() => Number(stringFolderId), [stringFolderId]);

  return (
    <div>
      <div className={mobileFolderDetailPageStyle}>
        <MobilePickInfiniteScrollList folderId={folderId} />
      </div>
    </div>
  );
}
