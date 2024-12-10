'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { FolderOpenIcon } from 'lucide-react';
import { PickRecordHeader } from '@/components';
import {
  currentFolderNameSectionStyle,
  folderOpenIconStyle,
  folderNameStyle,
} from '@/components/FolderContentHeader/currentFolderNameSection.css';
import { folderContentHeaderStyle } from '@/components/FolderContentHeader/folderContentHeader.css';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import { FolderLoadingPage } from '@/components/FolderLoadingPage';
import { Gap } from '@/components/Gap';
import { PickContentLayout } from '@/components/PickContentLayout';
import { SharePickRecord } from '@/components/PickRecord/SharePickRecord';
import useFetchShareFolderById from '@/hooks/useFetchShareFolderById';

const EmptyPickRecordImage = dynamic(
  () =>
    import('@/components/EmptyPickRecordImage').then(
      (mod) => mod.EmptyPickRecordImage
    ),
  {
    ssr: false,
  }
);

export default function Page() {
  const { shareFolderList, isLoading, isError } = useFetchShareFolderById();
  const { uuid } = useParams<{ uuid: string }>();

  if (isError) {
    return (
      <EmptyPickRecordImage
        title="삭제된 폴더입니다."
        description="삭제되거나 접근할 수 없는 폴더입니다."
      />
    );
  }

  if (isLoading || !shareFolderList) {
    return <FolderLoadingPage />;
  }
  const pickList = shareFolderList.pickList!;

  return (
    <FolderContentLayout>
      <div className={folderContentHeaderStyle}>
        <Gap verticalSize="gap32" horizontalSize="gap32">
          <div className={currentFolderNameSectionStyle}>
            <FolderOpenIcon size={28} className={folderOpenIconStyle} />
            <h1 className={folderNameStyle}>{shareFolderList.folderName}</h1>
          </div>
        </Gap>
      </div>
      <PickContentLayout>
        <PickRecordHeader />
        {pickList.length === 0 ? (
          <EmptyPickRecordImage
            title="공유된 픽이 없습니다."
            description="폴더 내 공유된 픽이 존재하지 않습니다."
          />
        ) : (
          pickList.map((pick) => {
            return (
              <SharePickRecord
                key={pick.title}
                pickInfo={pick}
                tagList={shareFolderList.tagList!}
                folderAccessToken={uuid}
              />
            );
          })
        )}
      </PickContentLayout>
    </FolderContentLayout>
  );
}
