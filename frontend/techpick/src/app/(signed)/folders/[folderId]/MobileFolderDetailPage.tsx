'use client';
import { MobilePickInfiniteScrollList } from '@/components/MobilePickInfiniteScrollList';
import { useParams } from 'next/navigation';

export function MobileFolderDetailPage() {
  const { folderId: stringFolderId } = useParams<{ folderId: string }>();
  const folderId = Number(stringFolderId);

  return (
    <div>
      <MobilePickInfiniteScrollList folderId={folderId} />
    </div>
  );
}
