'use client';

import { useEffect, useState } from 'react';
import { getSuggestionRankingPicks } from '@/apis/getSuggestionRankingPicks';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import { Gap } from '@/components/Gap';
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
  recommendPageDescriptionStyle,
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
        <h1 className={recommendPageTitleStyle}>이런 글은 어떠세요?</h1>
        <p className={recommendPageDescriptionStyle}>
          다른 유저들이 무엇을 보는지 알아보세요!
        </p>

        <div className={recommendContentSectionStyle}>
          {suggestionRankingPicks.dailyViewRanking.length !== 0 && (
            <div className={recommendedPickCarouselSectionStyle}>
              <div className={recommendedPickCarouselStyle}>
                <h2 className={recommendSectionDescription}>
                  오늘 가장 <span className={pointTextStyle}>핫한</span> 북마크
                  🔥
                </h2>
              </div>
              <Gap verticalSize="gap12" />
              <RecommendedPickCarousel
                recommendPickList={suggestionRankingPicks.dailyViewRanking}
                recommendPickCategoryType="dailyViewRanking"
              />
            </div>
          )}

          {suggestionRankingPicks.weeklyViewRanking.length !== 0 && (
            <div className={recommendedPickCarouselSectionStyle}>
              <div className={recommendedPickCarouselStyle}>
                <h2 className={recommendSectionDescription}>
                  이번 주 가장 많이
                  <span className={pointTextStyle}> 본</span> 북마크 👀
                </h2>
              </div>
              <Gap verticalSize="gap12" />
              <RecommendedPickCarousel
                recommendPickList={suggestionRankingPicks.weeklyViewRanking}
                recommendPickCategoryType="weeklyViewRanking"
              />
            </div>
          )}

          {suggestionRankingPicks.monthlyPickRanking.length !== 0 && (
            <div className={recommendedPickCarouselSectionStyle}>
              <div className={recommendedPickCarouselStyle}>
                <h2 className={recommendSectionDescription}>
                  다른 사용자가 가장 많이
                  <span className={pointTextStyle}> 저장한</span> 북마크 ⭐
                </h2>
              </div>
              <Gap verticalSize="gap12" />
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
