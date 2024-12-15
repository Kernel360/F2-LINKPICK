import Image from 'next/image';
import Link from 'next/link';
import {
  dividerStyle,
  failedDescriptionTextStyle,
  googleLoginContainer,
  kakaoLoginContainer,
  loginBlockContainer,
  loginLink,
  pickBrandContainer,
  pickBrandContainerWithText,
  pickIconContainer,
  screenContainer,
} from './page.css';

export default function LoginFailedPage() {
  const redirectUrl = encodeURIComponent(
    process.env.NEXT_PUBLIC_REDIRECT_URL ?? ''
  );

  return (
    <div className={screenContainer}>
      <div className={loginBlockContainer}>
        <div className={pickBrandContainer}>
          <div className={pickBrandContainerWithText}>
            <div className={pickIconContainer}>
              <Image
                src={`/image/logo_techpick.png`}
                alt="TechPick Logo"
                fill
                objectFit={'contain'}
              />
            </div>
            <h1>SIGN UP</h1>
          </div>
        </div>
        <hr className={dividerStyle} />
        <div style={{ paddingTop: '36px', paddingBottom: '8px' }}>
          <div className={googleLoginContainer}>
            <Link
              className={loginLink}
              href={`${process.env.NEXT_PUBLIC_API}/login/google?redirectUrl=${redirectUrl}`}
            >
              <Image
                style={{ filter: 'brightness(100)' }}
                src={`/image/logo_google.png`}
                alt="Google Logo"
                width={20}
                height={20}
              />
              <span>Sign up with Google</span>
            </Link>
          </div>
          <div className={kakaoLoginContainer}>
            <Link
              className={loginLink}
              href={`${process.env.NEXT_PUBLIC_API}/login/kakao?redirectUrl=${redirectUrl}`}
            >
              <Image
                style={{ filter: 'invert(100%)' }}
                src={`/image/logo_kakao.svg`}
                alt="Kakao Logo"
                width={20}
                height={20}
              />
              Sign up with Kakao
            </Link>
          </div>
          <div className={failedDescriptionTextStyle}>
            <p>죄송합니다. 로그인에 실패했습니다. </p>
          </div>
        </div>
      </div>
    </div>
  );
}
