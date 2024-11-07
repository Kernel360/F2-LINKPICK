'use client';

import { PropsWithChildren } from 'react';

export function PickCard({ children }: PropsWithChildren<PickCardProps>) {
  return { children };

  // 나중에 픽 리스트를 조회할 때 다시 사용할 예정입니다.

  // const {
  //   data: pickData,
  //   isLoading,
  //   isError,
  // } = useGetPickQuery(node.data.pickId);
  // const ref = useDragHook(node);

  // if (isLoading) {
  //   return (
  //     <div className={`${pickCardLayout} ${skeleton}`}>
  //       <div className={`${cardImageSectionStyle} ${skeleton}`}>
  //         <div className={defaultCardImageSectionStyle} />
  //       </div>
  //     </div>
  //   );
  // }

  // if (isError || !pickData) {
  //   return <p>oops! something is wrong</p>;
  // }

  // const { memo, title, linkInfo } = pickData;
  // const { imageUrl, url } = linkInfo;

  // return (
  //   <Link href={url} target="_blank" className={linkStyle}>
  //     <div
  //       className={pickCardLayout}
  //       ref={ref as unknown as React.LegacyRef<HTMLDivElement>}
  //     >
  //       <div className={cardImageSectionStyle}>
  //         {imageUrl ? (
  //           <Image
  //             src={imageUrl}
  //             width={278}
  //             height={64}
  //             className={cardImageStyle}
  //             alt=""
  //           />
  //         ) : (
  //           <div className={defaultCardImageSectionStyle} />
  //         )}
  //       </div>

  //       <div className={cardTitleSectionStyle}>
  //         <p>{title}</p>
  //       </div>
  //       <div className={cardDescriptionSectionStyle}>
  //         <p>{memo}</p>
  //       </div>
  //       <div>{children}</div>
  //     </div>
  //   </Link>
  // );
}
interface PickCardProps {
  pickId: number;
}
