'use client';

import { getSuggestionRankingPicks } from '@/apis/getSuggestionRankingPicks';
import { DisableDroppableZone } from '@/components/DisableDroppableZone';
import { FolderContentLayout } from '@/components/FolderContentLayout';
import { Gap } from '@/components/Gap';
import { RecommendedPickCarousel } from '@/components/RecommendedPickCarousel/RecommendedPickCarousel';
import { TutorialDialog } from '@/components/TutorialDialog';
import { IS_TUTORIAL_SEEN_LOCAL_STORAGE_KEY } from '@/constants/isTutorialSeenLocalStorageKey';
import { useClearSelectedPickIdsOnMount } from '@/hooks/useClearSelectedPickIdsOnMount';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useResetPickFocusOnOutsideClick } from '@/hooks/useResetPickFocusOnOutsideClick';
import { useFetchBasicFolders } from '@/queries/useFetchBasicFolders';
import { useFetchTagList } from '@/queries/useFetchTagList';
import type { GetSuggestionRankingPicksResponseType } from '@/types/GetSuggestionRankingPicksResponseType';
import { useEffect, useState } from 'react';
import { RecommendLoadingPage } from './RecommendLoadingPage';
import {
  pointTextStyle,
  recommendContentSectionStyle,
  recommendPageDescriptionSectionStyle,
  recommendPageDescriptionStyle,
  recommendPageTitleStyle,
  recommendSectionDescription,
  recommendSectionLayoutStyle,
  recommendedPickCarouselSectionStyle,
  recommendedPickCarouselStyle,
} from './page.css';

export default function RecommendPage() {
  const { data: basicFolderRecord } = useFetchBasicFolders();
  useResetPickFocusOnOutsideClick();
  useClearSelectedPickIdsOnMount();
  const [suggestionRankingPicks, setSuggestionRankingPicks] =
    useState<GetSuggestionRankingPicksResponseType>();
  useFetchTagList();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { storedValue: isTutorialSeen, isStoredValueLoad } = useLocalStorage(
    IS_TUTORIAL_SEEN_LOCAL_STORAGE_KEY,
    false,
  );

  useEffect(function loadSuggestionRankingPicks() {
    const fetchSuggestionRankingPicks = async () => {
      const data = await getSuggestionRankingPicks();
      setSuggestionRankingPicks(data);
    };

    fetchSuggestionRankingPicks();
  }, []);

  useEffect(
    function openTutorialForFirstTimeUser() {
      if (isStoredValueLoad && !isTutorialSeen) {
        onOpen();
      }
    },
    [isStoredValueLoad, isTutorialSeen, onOpen],
  );

  if (!basicFolderRecord || !suggestionRankingPicks) {
    return <RecommendLoadingPage />;
  }

  return (
    <DisableDroppableZone id={'disable recommend pick drag and drop'}>
      <FolderContentLayout>
        <TutorialDialog isOpen={isOpen} onClose={onClose} />

        <div className={recommendSectionLayoutStyle}>
          <div className={recommendPageDescriptionSectionStyle}>
            <h1 className={recommendPageTitleStyle}>이런 글은 어떠세요?</h1>
            <p className={recommendPageDescriptionStyle}>
              다른 유저들이 무엇을 보는지 알아보세요!
            </p>
          </div>

          <div className={recommendContentSectionStyle}>
            {suggestionRankingPicks.dailyViewRanking.length !== 0 && (
              <div className={recommendedPickCarouselSectionStyle}>
                <div className={recommendedPickCarouselStyle}>
                  <h2 className={recommendSectionDescription}>
                    오늘 가장 <span className={pointTextStyle}>핫한</span>{' '}
                    북마크 🔥
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
    </DisableDroppableZone>
  );
}
