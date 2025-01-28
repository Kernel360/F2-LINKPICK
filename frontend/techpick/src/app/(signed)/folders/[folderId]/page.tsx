'use client';

import { FolderContentHeader } from '@/components/FolderContentHeader/FolderContentHeader';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import { PickContentLayout } from '@/components/PickContentLayout';
import { PickDraggableRecordList } from '@/components/PickDraggableRecordList';
import { useClearSelectedPickIdsOnMount } from '@/hooks/useClearSelectedPickIdsOnMount';
import { useResetPickFocusOnOutsideClick } from '@/hooks/useResetPickFocusOnOutsideClick';
import { useParams } from 'next/navigation';

export default function FolderDetailPage() {
  const { folderId: stringFolderId } = useParams<{ folderId: string }>();
  const folderId = Number(stringFolderId);
  useResetPickFocusOnOutsideClick();
  useClearSelectedPickIdsOnMount();

  return (
    <FolderContentLayout>
      <FolderContentHeader folderId={folderId} />
      <PickContentLayout>
        <PickDraggableRecordList folderId={folderId} />
      </PickContentLayout>
    </FolderContentLayout>
  );
}
