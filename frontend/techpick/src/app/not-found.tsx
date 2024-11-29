import Image from 'next/image';
import {
  notFoundPageImageStyle,
  notFoundPageLayout,
  notFoundPageTitleStyle,
} from './not-found.css';

export default function NotFoundPage() {
  return (
    <div className={notFoundPageLayout}>
      <div className={notFoundPageImageStyle}>
        <Image
          src={'/image/notFound.png'}
          alt="not-found image"
          width={600}
          height={600}
        />
        <h1 className={notFoundPageTitleStyle}>잘못된 페이지 접근입니다.</h1>
      </div>
    </div>
  );
}
