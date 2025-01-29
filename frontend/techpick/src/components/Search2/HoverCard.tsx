import { useSearchPickStore } from '@/stores/searchPickStore';
import { checkImageUrlByUrl } from '@/utils/checkImageUrlByUrl';
import { formatDateString } from '@/utils/formatDateString';
import Image from 'next/image';
import * as styles from './hoverCard.css';

export default function HoverCard() {
  const { hoverPickInfo } = useSearchPickStore();

  return (
    <div className={styles.hoverCardContainer}>
      <div className={styles.hoverCardBorderLine}>
        <h1 className={styles.hoverCardTitle}>{hoverPickInfo?.title}</h1>
        <div className={styles.hoverCardImageContainer}>
          <a
            href={hoverPickInfo?.linkInfo.url as string}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={checkImageUrlByUrl(hoverPickInfo?.linkInfo.imageUrl)}
              alt="link-image"
              height={200}
              width={200}
              className={styles.hoverCardImage}
            />
          </a>
        </div>
        <div className={styles.hoverDataCardContainer}>
          <span className={styles.hoverCardDate}>생성 일시</span>
          <span className={styles.hoverCardDate}>
            {hoverPickInfo && formatDateString(hoverPickInfo.createdAt)}
          </span>
        </div>
        <div className={styles.hoverDataCardContainer}>
          <span className={styles.hoverCardDate}>최종 편집일</span>
          <span className={styles.hoverCardDate}>
            {hoverPickInfo && formatDateString(hoverPickInfo.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
