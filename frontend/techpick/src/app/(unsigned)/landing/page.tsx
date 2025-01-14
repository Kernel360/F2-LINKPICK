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
  sectionTitleStyle,
  videoStyle,
  sectionDescriptionStyle,
  sectionTextAreaStyle,
  sectionContentStyle,
  lineBreakStyle,
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
          <div className={sectionContentStyle}>
            <div className={sectionTextAreaStyle}>
              <h2 className={sectionTitleStyle}>
                태그를 이용해 <br />
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

        <section className={sectionStyle}>
          <div className={sectionContentStyle}>
            <div className={sectionTextAreaStyle}>
              <h2 className={sectionTitleStyle}>
                익숙한 방식
                <br /> 그대로 북마크를 수집해요
              </h2>
              <p className={sectionDescriptionStyle}>
                태그를 달거나 어울리는 폴더로 넣을 수 있어요.
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

        <section className={sectionStyle}>
          <div className={sectionContentStyle}>
            <div className={sectionTextAreaStyle}>
              <h2 className={sectionTitleStyle}>더 직관적인 검색</h2>
              <p className={sectionDescriptionStyle}>
                제목과 태그, 폴더고 구분해서 검색할 수 있어요
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

        <section className={sectionStyle}>
          <div className={sectionContentStyle}>
            <div className={sectionTextAreaStyle}>
              <h2 className={sectionTitleStyle}>
                링크를 <br />
                쉽게 공유할 수 있어요
              </h2>
              <p className={sectionDescriptionStyle}>
                더 이상 어딘가에 url을 한줄씩 붙여넣지 마세요
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
      </main>
    </div>
  );
}
