'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import { PickContentLayout } from '@/components/PickContentLayout';

const EmptyPickRecordImage = dynamic(
  () =>
    import('@/components/EmptyPickRecordImage').then(
      (mod) => mod.EmptyPickRecordImage
    ),
  {
    ssr: false,
  }
);

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <FolderContentLayout>
      <PickContentLayout>
        <EmptyPickRecordImage
          title="삭제된 폴더입니다."
          description="삭제되거나 접근할 수 없는 폴더입니다."
        />
      </PickContentLayout>
    </FolderContentLayout>
  );
}
