import React from 'react';
import dynamic from 'next/dynamic';
import { FolderOpenIcon } from 'lucide-react';
import { getShareFolderById } from '@/apis/folder/getShareFolderById';
import { PickRecordHeader } from '@/components';
import {
  currentFolderNameSectionStyle,
  folderOpenIconStyle,
  folderNameStyle,
} from '@/components/FolderContentHeader/currentFolderNameSection.css';
import { folderContentHeaderStyle } from '@/components/FolderContentHeader/folderContentHeader.css';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import { Gap } from '@/components/Gap';
import { PickContentLayout } from '@/components/PickContentLayout';
import { SharePickRecord } from '@/components/PickRecord/SharePickRecord';

const EmptyPickRecordImage = dynamic(
  () =>
    import('@/components/EmptyPickRecordImage').then(
      (mod) => mod.EmptyPickRecordImage
    ),
  {
    ssr: false,
  }
);

export default async function Page({ params }: { params: { uuid: string } }) {
  const { uuid } = params;
  const sharedFolder = await getShareFolderById(uuid);
  const pickList = sharedFolder.pickList;

  if (pickList.length === 0) {
    return (
      <FolderContentLayout>
        <div className={folderContentHeaderStyle}>
          <Gap verticalSize="gap32" horizontalSize="gap32">
            <div className={currentFolderNameSectionStyle}>
              <FolderOpenIcon size={28} className={folderOpenIconStyle} />
              <h1 className={folderNameStyle}>{sharedFolder.folderName}</h1>
            </div>
          </Gap>
        </div>
        <PickContentLayout>
          <EmptyPickRecordImage
            title="공유된 북마크가 없습니다."
            description="폴더 내 공유된 북마크가 존재하지 않습니다."
          />
        </PickContentLayout>
      </FolderContentLayout>
    );
  }

  return (
    <FolderContentLayout>
      <div className={folderContentHeaderStyle}>
        <Gap verticalSize="gap32" horizontalSize="gap32">
          <div className={currentFolderNameSectionStyle}>
            <FolderOpenIcon size={28} className={folderOpenIconStyle} />
            <h1 className={folderNameStyle}>{sharedFolder.folderName}</h1>
          </div>
        </Gap>
      </div>
      <PickContentLayout>
        <PickRecordHeader />
        {pickList.length === 0 ? (
          <EmptyPickRecordImage
            title="공유된 북마크가 없습니다."
            description="폴더 내 공유된 북마크가 존재하지 않습니다."
          />
        ) : (
          pickList.map((pick) => {
            return (
              <SharePickRecord
                key={pick.title}
                pickInfo={pick}
                tagList={sharedFolder.tagList!}
                folderAccessToken={uuid}
              />
            );
          })
        )}
      </PickContentLayout>
    </FolderContentLayout>
  );
}
