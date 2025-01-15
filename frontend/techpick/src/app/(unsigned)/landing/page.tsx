import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants';
import { LandingPageAnimation } from './LandingPageAnimation';
import {
  navStyle,
  navUlStyle,
  loginLinkStyle,
  headerStyle,
  mainSectionStyle,
  titleStyle,
  landingPageStyle,
  sectionStyle,
  sectionTitleStyle,
  videoStyle,
  sectionDescriptionStyle,
  sectionTextAreaStyle,
  sectionContentStyle,
  lineBreakStyle,
  textPointStyle,
  sectionTitleBrStyle,
  shareBookmarkSectionStyle,
  extensionSectionStyle,
  extensionVideoStyle,
  extensionTextAreaStyle,
  mobileLinBreakStyle,
} from './page.css';
import { SignUpLink } from './SignUpLink';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바구니 | 깔끔한 북마크 관리',
  description: '수집하다보니 쌓여버린 북마크, 편하게 관리하세요',
};

export default function LandingPage() {
  return (
    <LandingPageAnimation>
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
                <SignUpLink />
              </li>
            </ul>
          </nav>
        </header>
        <main className={mainSectionStyle}>
          <h1 className={titleStyle}>
            <div>수집하다보니 쌓여버린 북마크</div>
            <div>편하게 관리하세요</div>
          </h1>

          <section className={`${sectionStyle} section`}>
            <div className={`${sectionContentStyle}  section-content`}>
              <div className={sectionTextAreaStyle}>
                <h2 className={sectionTitleStyle}>
                  태그를 이용해 <br className={sectionTitleBrStyle} />
                  보기 쉽게 관리해요
                </h2>
                <p className={sectionDescriptionStyle}>
                  이 북마크를 읽었는지, <span className={lineBreakStyle}></span>
                  마음에 들어 다시 보고 싶은지 태그로 기록하는 건 어떠세요?
                </p>
              </div>
              <video
                src="/video/tagEdit.mp4"
                autoPlay
                muted
                playsInline
                loop
                className={videoStyle}
              ></video>
            </div>
          </section>

          <section className={`${sectionStyle} section`}>
            <div
              className={`${sectionContentStyle} ${extensionSectionStyle} section-content`}
            >
              <div
                className={`${sectionTextAreaStyle} ${extensionTextAreaStyle}`}
              >
                <h2 className={sectionTitleStyle}>
                  익숙한 방식 그대로 북마크를 수집해요
                </h2>
                <p className={sectionDescriptionStyle}>
                  태그를 달거나 어울리는 폴더로 넣을 수 있어요.
                  <span className={mobileLinBreakStyle}></span>
                  <a
                    href="https://chromewebstore.google.com/detail/%EB%B0%94%EA%B5%AC%EB%8B%88-%EC%9D%B5%EC%8A%A4%ED%85%90%EC%85%98/gfkkgllophliamkdclhekgfiohnbdddl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={` ${textPointStyle}`}
                  >
                    {' '}
                    익스텐션
                  </a>
                  을 바로 설치해보세요!
                </p>
              </div>
              <video
                src="/video/saveBookmark.mp4"
                autoPlay
                muted
                playsInline
                loop
                className={`${videoStyle} ${extensionVideoStyle}`}
              ></video>
            </div>
          </section>

          <section className={`${sectionStyle}  section`}>
            <div
              className={`${sectionContentStyle} ${shareBookmarkSectionStyle} section-content`}
            >
              <div className={sectionTextAreaStyle}>
                <h2 className={sectionTitleStyle}>
                  링크를 <br className={sectionTitleBrStyle} />
                  쉽게 공유할 수 있어요
                </h2>
                <p className={sectionDescriptionStyle}>
                  더 이상 어딘가에 url을 한줄씩 붙여넣지 마세요
                </p>
              </div>

              <video
                src="/video/share.mp4"
                autoPlay
                muted
                playsInline
                loop
                className={videoStyle}
              ></video>
            </div>
          </section>
        </main>
      </div>
    </LandingPageAnimation>
  );
}
