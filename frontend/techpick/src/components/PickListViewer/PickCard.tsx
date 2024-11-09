import Image from 'next/image';
import Link from 'next/link';
import { PickViewItemComponentProps } from '.';
import {
  cardDescriptionSectionStyle,
  cardImageSectionStyle,
  cardImageStyle,
  cardTitleSectionStyle,
  defaultCardImageSectionStyle,
  linkStyle,
  pickCardLayout,
} from './pickCard.css';

export function PickCard({ pickInfo }: PickViewItemComponentProps) {
  const { memo, title, linkInfo } = pickInfo;
  const { imageUrl, url } = linkInfo;

  return (
    <Link href={url} target="_blank" className={linkStyle}>
      <div className={pickCardLayout}>
        <div className={cardImageSectionStyle}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              width={278}
              height={64}
              className={cardImageStyle}
              alt=""
            />
          ) : (
            <div className={defaultCardImageSectionStyle} />
          )}
        </div>

        <div className={cardTitleSectionStyle}>
          <p>{title}</p>
        </div>
        <div className={cardDescriptionSectionStyle}>
          <p>{memo}</p>
        </div>
      </div>
    </Link>
  );
}
