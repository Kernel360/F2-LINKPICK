'use client';
import { MobilePickInfiniteScrollList } from '@/components/MobilePickInfiniteScrollList';
import { useParams } from 'next/navigation';
import { mobileFolderDetailPageStyle } from './mobileFolderDetailPage.css';

export function MobileFolderDetailPage() {
  const { folderId: stringFolderId } = useParams<{ folderId: string }>();
  const folderId = Number(stringFolderId);

  return (
    <div className={mobileFolderDetailPageStyle}>
      <MobilePickInfiniteScrollList folderId={folderId} />
    </div>
  );
}
