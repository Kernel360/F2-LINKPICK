'use client';

import { useEffect } from 'react';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import { RecommendedPickCarousel } from '@/components/RecommendedPickCarousel/RecommendedPickCarousel';
import {
  useClearSelectedPickIdsOnMount,
  useResetPickFocusOnOutsideClick,
} from '@/hooks';
import { useTreeStore } from '@/stores';
import {
  recommendedPickCarouselSectionStyle,
  recommendedPickCarouselStyle,
  recommendSectionDescription,
  pointTextStyle,
  recommendSectionLayoutStyle,
  recommendPageTitleStyle,
  recommendContentSectionStyle,
} from './page.css';
import { RecommendLoadingPage } from './RecommendLoadingPage';

export default function RecommendPage() {
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
    return <RecommendLoadingPage />;
  }

  return (
    <FolderContentLayout>
      <div className={recommendSectionLayoutStyle}>
        <h1 className={recommendPageTitleStyle}>🔥HOT TREND!🔥</h1>
        <div className={recommendContentSectionStyle}>
          <div className={recommendedPickCarouselSectionStyle}>
            <div className={recommendedPickCarouselStyle}>
              <h2 className={recommendSectionDescription}>
                오늘 가장 <span className={pointTextStyle}>핫한</span> 픽
              </h2>
            </div>
            <RecommendedPickCarousel />
          </div>

          <div className={recommendedPickCarouselSectionStyle}>
            <RecommendedPickCarousel />
            <div className={recommendedPickCarouselStyle}>
              <h2 className={recommendSectionDescription}>
                🔥🔥이번 주 가장 많이 <span className={pointTextStyle}>본</span>{' '}
                픽🔥🔥
              </h2>
            </div>
          </div>

          <div className={recommendedPickCarouselSectionStyle}>
            <div className={recommendedPickCarouselStyle}>
              <h2 className={recommendSectionDescription}>
                다른 사용자가 가장 많이{' '}
                <span className={pointTextStyle}>저장한</span> 픽
              </h2>
            </div>
            <RecommendedPickCarousel />
          </div>
        </div>
      </div>
    </FolderContentLayout>
  );
}
