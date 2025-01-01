import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
import { ScreenLogger } from '@/components/ScreenLogger';
import { ROUTES } from '@/constants';
import { isLoginUser } from '@/utils';
import {
  buttonSectionStyle,
  homeNavigateButtonStyle,
  loginButtonStyle,
} from './page.css';
import { SignUpLinkButton } from './SignUpLinkButton';
import type { Metadata, ResolvingMetadata } from 'next';
const EmptyPickRecordImage = dynamic(
  () =>
    import('@/components/EmptyPickRecordImage').then(
      (mod) => mod.EmptyPickRecordImage
    ),
  {
    ssr: false,
  }
);

export async function generateMetadata(
  {
    params,
  }: {
    params: { uuid: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { uuid } = params;
  const sharedFolder = await getShareFolderById(uuid);
  const { pickList } = sharedFolder;

  const imageUrls = pickList
    .map((pick) => pick.linkInfo.imageUrl)
    .filter((url) => url && url !== '')
    .slice(0, 16); // 최대 16개까지 허용

  let ogImageUrl: string;

  if (imageUrls.length === 0) {
    ogImageUrl = `/image/og_image.png`;
  } else {
    const apiUrl = new URL(
      `${process.env.NEXT_PUBLIC_IMAGE_URL}/api/generate-og-image`
    );
    apiUrl.searchParams.set('imageUrls', JSON.stringify(imageUrls));
    ogImageUrl = apiUrl.toString();
  }

  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `${sharedFolder.folderName} 폴더 공유 페이지`,
    description: `${pickList.length}개의 북마크가 공유되었습니다.`,
    openGraph: {
      images: [ogImageUrl, ...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { uuid: string } }) {
  const { uuid } = params;
  const sharedFolder = await getShareFolderById(uuid);
  const isLoggedIn = await isLoginUser();
  const pickList = sharedFolder.pickList;

  return (
    <ScreenLogger
      eventName="shared_page_view"
      logInfo={{
        folderUUID: uuid,
        folderName: sharedFolder.folderName,
        pickCount: pickList.length,
      }}
    >
      <FolderContentLayout>
        <div className={folderContentHeaderStyle}>
          <Gap verticalSize="gap32" horizontalSize="gap32">
            <div className={currentFolderNameSectionStyle}>
              <FolderOpenIcon size={28} className={folderOpenIconStyle} />
              <h1 className={folderNameStyle}>{sharedFolder.folderName}</h1>
            </div>
          </Gap>

          <div className={buttonSectionStyle}>
            {isLoggedIn ? (
              <Link href={ROUTES.HOME}>
                <button className={homeNavigateButtonStyle}>홈으로 가기</button>
              </Link>
            ) : (
              <>
                <Link href={ROUTES.LOGIN}>
                  <button className={loginButtonStyle}>로그인</button>
                </Link>
                <SignUpLinkButton />
              </>
            )}
          </div>
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
    </ScreenLogger>
  );
}
