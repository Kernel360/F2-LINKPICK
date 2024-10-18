'use client';

import { PropsWithChildren } from 'react';
import Image from 'next/image';
import { useGetPickQuery } from '../api';
import {
  pickCardLayout,
  cardImageSectionStyle,
  cardTitleSectionStyle,
  cardDescriptionSectionStyle,
  cardImageStyle,
} from './pickCard.css';

export function PickCard({
  children,
  pickId,
}: PropsWithChildren<PickCardProps>) {
  // 아래 값들은 다음 PR에서 id값으로 api통신을 이용해 값 받아올 예정.
  const baseImageUrl =
    'https://www.fitpetmall.com/wp-content/uploads/2023/10/shutterstock_602702633-1024x351-1.png';

  const { data: pickData, isLoading, isError } = useGetPickQuery(pickId);

  if (isLoading) {
    return <p>loading</p>;
  }

  if (isError || !pickData) {
    return <p>oops! something is wrong</p>;
  }

  const { linkUrlResponse, memo, title } = pickData;
  const { imageUrl } = linkUrlResponse;

  console.log('linkUrlResponse imageUrl', imageUrl);

  return (
    <div className={pickCardLayout}>
      <div className={cardImageSectionStyle}>
        <Image
          src={baseImageUrl}
          width={280}
          height={64}
          className={cardImageStyle}
          alt=""
        />
      </div>

      <div className={cardTitleSectionStyle}>
        <p>{title}</p>
      </div>
      <div className={cardDescriptionSectionStyle}>
        <p>{memo}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
interface PickCardProps {
  pickId: number;
}
