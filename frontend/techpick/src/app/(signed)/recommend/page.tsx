'use client';

import { useEffect, useState } from 'react';
import { getSuggestionRankingPicks } from '@/apis/getSuggestionRankingPicks';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import { RecommendedPickCarousel } from '@/components/RecommendedPickCarousel/RecommendedPickCarousel';
import { TutorialDialog } from '@/components/TutorialDialog';
import {
  useClearSelectedPickIdsOnMount,
  useFetchTagList,
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
  useFetchTagList();

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
      <TutorialDialog />

      <div className={recommendSectionLayoutStyle}>
        <h1 className={recommendPageTitleStyle}>🔥HOT TREND!🔥</h1>

        <div className={recommendContentSectionStyle}>
          {suggestionRankingPicks.dailyViewRanking.length !== 0 && (
            <div className={recommendedPickCarouselSectionStyle}>
              <div className={recommendedPickCarouselStyle}>
                <h2 className={recommendSectionDescription}>
                  오늘 가장 <span className={pointTextStyle}>핫한</span> 픽
                </h2>
              </div>
              <RecommendedPickCarousel
                recommendPickList={suggestionRankingPicks.dailyViewRanking}
                recommendPickCategoryType="dailyViewRanking"
              />
            </div>
          )}

          {suggestionRankingPicks.weeklyViewRanking.length !== 0 && (
            <div className={recommendedPickCarouselSectionStyle}>
              <RecommendedPickCarousel
                recommendPickList={suggestionRankingPicks.weeklyViewRanking}
                recommendPickCategoryType="weeklyViewRanking"
              />
              <div className={recommendedPickCarouselStyle}>
                <h2 className={recommendSectionDescription}>
                  🔥🔥이번 주 가장 많이
                  <span className={pointTextStyle}>본</span> 픽🔥🔥
                </h2>
              </div>
            </div>
          )}

          {suggestionRankingPicks.monthlyPickRanking.length !== 0 && (
            <div className={recommendedPickCarouselSectionStyle}>
              <div className={recommendedPickCarouselStyle}>
                <h2 className={recommendSectionDescription}>
                  다른 사용자가 가장 많이
                  <span className={pointTextStyle}>저장한</span> 픽
                </h2>
              </div>
              <RecommendedPickCarousel
                recommendPickList={suggestionRankingPicks.monthlyPickRanking}
                recommendPickCategoryType="monthlyPickRanking"
              />
            </div>
          )}
        </div>
      </div>
    </FolderContentLayout>
  );
}
