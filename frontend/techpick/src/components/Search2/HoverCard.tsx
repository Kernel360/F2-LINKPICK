import React from 'react';
import Image from 'next/image';
import { useSearchPickStore } from '@/stores/searchPickStore';
import { formatDateString } from '@/utils';
import * as styles from './hoverCard.css';

function getImageUrl(url: string | undefined): string {
  return url?.trim() || '/image/default_image.svg';
}

export default function HoverCard() {
  const { searchResultList, hoverPickIndex } = useSearchPickStore();

  return (
    <div className={styles.hoverCardContainer}>
      <div className={styles.hoverCardBorderLine}>
        <h1 className={styles.hoverCardTitle}>
          {searchResultList[hoverPickIndex]?.title}
        </h1>
        <div className={styles.hoverCardImageContainer}>
          <a
            href={searchResultList[hoverPickIndex]?.linkInfo.url as string}
            target="_blank"
          >
            <Image
              src={getImageUrl(
                searchResultList[hoverPickIndex]?.linkInfo.imageUrl
              )}
              alt="link-image"
              height={200}
              width={200}
            />
          </a>
        </div>
        <div className={styles.hoverDataCardContainer}>
          <span className={styles.hoverCardDate}>생성 일시</span>
          <span className={styles.hoverCardDate}>
            {searchResultList[hoverPickIndex] &&
              formatDateString(searchResultList[hoverPickIndex].createdAt)}
          </span>
        </div>
        <div className={styles.hoverDataCardContainer}>
          <span className={styles.hoverCardDate}>최종 편집일</span>
          <span className={styles.hoverCardDate}>
            {searchResultList[hoverPickIndex] &&
              formatDateString(searchResultList[hoverPickIndex].updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
