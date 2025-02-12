import { getShareFolderById } from '@/apis/folder/getShareFolderById';
import { currentFolderNameSectionStyle } from '@/components/FolderContentHeader/currentFolderNameSection.css';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import { MobileEmptyPickRecordImage } from '@/components/MobileEmptyPickRecordImage';
import { PickContentLayout } from '@/components/PickContentLayout';
import { PickRecordHeader } from '@/components/PickRecord/PickRecordHeader';
import { ScreenLogger } from '@/components/ScreenLogger';
import { ROUTES } from '@/constants/route';
import { isLoginUser } from '@/utils/isLoginUser';
import { FolderOpenIcon } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { LandingPageLinkButton } from './LandingPageLinkButton';
import { MobileSharedPickRecord } from './MobileSharedPickRecord';
import { SharePickRecord } from './SharePickRecord';
import { SignUpLinkButton } from './SignUpLinkButton';
import {
  buttonSectionStyle,
  desktopVisibleStyle,
  folderContentHeaderStyle,
  folderNameStyle,
  folderOpenIconStyle,
  homeNavigateButtonStyle,
  mobileAndTabletVisibleStyle,
  mobilePickRecordListStyle,
} from './page.css';
const EmptyPickRecordImage = dynamic(
  () =>
    import('@/components/EmptyPickRecordImage').then(
      (mod) => mod.EmptyPickRecordImage,
    ),
  {
    ssr: false,
  },
);

// TODO:
// 해당 코드는 api를 쓰는 방식이 아닌,
// https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx
// 에서 나오는 방식으로 변경해야합니다.
export async function generateMetadata(
  {
    params,
  }: {
    params: { uuid: string };
  },
  parent: ResolvingMetadata,
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
    ogImageUrl = '/image/og_image.png';
  } else {
    const apiUrl = new URL(
      `${process.env.NEXT_PUBLIC_IMAGE_URL}/api/generate-og-image`,
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
          <div className={currentFolderNameSectionStyle}>
            <FolderOpenIcon size={28} className={folderOpenIconStyle} />
            <h1 className={folderNameStyle}>{sharedFolder.folderName}</h1>
          </div>

          <div className={buttonSectionStyle}>
            {isLoggedIn ? (
              <Link href={ROUTES.HOME}>
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button className={homeNavigateButtonStyle}>홈으로 가기</button>
              </Link>
            ) : (
              <>
                <LandingPageLinkButton />
                <SignUpLinkButton />
              </>
            )}
          </div>
        </div>
        <div className={desktopVisibleStyle}>
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
                    tagList={sharedFolder.tagList}
                    folderAccessToken={uuid}
                  />
                );
              })
            )}
          </PickContentLayout>
        </div>

        <div className={mobileAndTabletVisibleStyle}>
          {pickList.length === 0 ? (
            <MobileEmptyPickRecordImage />
          ) : (
            <div className={mobilePickRecordListStyle}>
              {pickList.map((pick) => {
                return (
                  <MobileSharedPickRecord
                    key={pick.title}
                    pickInfo={pick}
                    tagList={sharedFolder.tagList}
                    folderAccessToken={uuid}
                  />
                );
              })}
            </div>
          )}
        </div>
      </FolderContentLayout>
    </ScreenLogger>
  );
}
