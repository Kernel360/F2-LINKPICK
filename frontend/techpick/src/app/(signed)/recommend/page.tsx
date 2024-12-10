'use client';

import { useEffect, useState } from 'react';
import { getSuggestionRankingPicks } from '@/apis/getSuggestionRankingPicks';
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
import { GetSuggestionRankingPicksResponseType } from '@/types';

export default function RecommendPage() {
  const selectSingleFolder = useTreeStore((state) => state.selectSingleFolder);
  const basicFolderMap = useTreeStore((state) => state.basicFolderMap);
  useResetPickFocusOnOutsideClick();
  useClearSelectedPickIdsOnMount();
  const [suggestionRankingPicks, setSuggestionRankingPicks] =
    useState<GetSuggestionRankingPicksResponseType>();

  useEffect(
    function selectRootFolderId() {
      if (!basicFolderMap) {
        return;
      }

      selectSingleFolder(basicFolderMap['ROOT'].id);
    },
    [basicFolderMap, selectSingleFolder]
  );

  useEffect(function loadSuggestionRankingPicks() {
    const fetchSuggestionRankingPicks = async () => {
      const data = await getSuggestionRankingPicks();
      setSuggestionRankingPicks(data);
    };

    fetchSuggestionRankingPicks();
  }, []);

  if (!basicFolderMap || !suggestionRankingPicks) {
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
            <RecommendedPickCarousel
              recommendPickList={suggestionRankingPicks.dailyViewRanking}
            />
          </div>

          <div className={recommendedPickCarouselSectionStyle}>
            <RecommendedPickCarousel
              recommendPickList={suggestionRankingPicks.weeklyViewRanking}
            />
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
            <RecommendedPickCarousel
              recommendPickList={suggestionRankingPicks.monthlyPickRanking}
            />
          </div>
        </div>
      </div>
    </FolderContentLayout>
  );
}
