import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/route';
import {
  navStyle,
  navUlStyle,
  loginLinkStyle,
  signUpButtonStyle,
  headerStyle,
  mainSectionStyle,
  titleStyle,
  landingPageStyle,
  sectionStyle,
} from './page.css';

export default function LandingPage() {
  return (
    <div className={landingPageStyle}>
      <header className={headerStyle}>
        <nav className={navStyle}>
          <div>
            <Image
              src={'/image/default_image.svg'}
              alt="baguni logo image"
              width={32}
              height={32}
            />
          </div>
          <ul className={navUlStyle}>
            <li>
              <Link href={ROUTES.LOGIN} className={loginLinkStyle}>
                로그인
              </Link>
            </li>
            <li>
              <Link href={ROUTES.LOGIN} className={signUpButtonStyle}>
                회원가입
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={mainSectionStyle}>
        <h1 className={titleStyle}>
          <div>수집하다보니 쌓여버린 북마크</div>
          <div>편하게 관리하세요</div>
        </h1>

        <section className={sectionStyle}>
          <div>
            <h2>썼던 방식 그대로</h2>
            <p>태그를 달거나 어울리는 폴더로 넣을 수 있어요.</p>
            <div>봤던 링크를 태그로 구분해보세요!</div>
            <video src=""></video>
          </div>
        </section>

        <section className={sectionStyle}>
          <h2>더 직관적인 검색</h2>
          <p>제목과 태그, 폴더고 구분해서 검색할 수 있어요</p>
          <div>봤던 링크를 태그로 구분해보세요!</div>
          <video src=""></video>
        </section>

        <section className={sectionStyle}>
          <h2>쉬운 공유</h2>
          <p>스터디에서 같이 읽었던 링크, 쉽게 공유할 수 있어요</p>
          <div>더 이상 url을 한줄씩 붙여넣지 마세요!</div>
          <div>봤던 링크를 태그로 구분해보세요!</div>
          <video src=""></video>
        </section>
      </main>
    </div>
  );
}
