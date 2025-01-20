'use client';

import { useEventLogger } from '@/hooks/useEventLogger';
import Image from 'next/image';
import Link from 'next/link';
import {
  dividerStyle,
  googleLoginContainer,
  kakaoLoginContainer,
  loginBlockContainer,
  loginContainerLayoutStyle,
  loginLink,
  pickBrandContainer,
  pickBrandContainerWithText,
  pickIconContainer,
  screenContainer,
} from './page.css';

export default function LoginPage() {
  const redirectUrl = encodeURIComponent(
    process.env.NEXT_PUBLIC_REDIRECT_URL ?? '',
  );
  const { trackEvent: trackLoginButtonClick } = useEventLogger({
    eventName: 'login_page_login_button_click',
  });

  return (
    <div className={screenContainer}>
      <div className={loginBlockContainer}>
        <div className={pickBrandContainer}>
          <div className={pickBrandContainerWithText}>
            <div className={pickIconContainer}>
              <Image
                src={'/image/logo_techpick.png'}
                alt="TechPick Logo"
                fill
                objectFit={'contain'}
              />
            </div>
            <h1>SIGN UP</h1>
          </div>
        </div>
        <hr className={dividerStyle} />
        <div className={loginContainerLayoutStyle}>
          <div className={googleLoginContainer}>
            <Link
              className={loginLink}
              href={`${process.env.NEXT_PUBLIC_API}/login/google?redirect_url=${redirectUrl}`}
              onClick={() => {
                trackLoginButtonClick();
              }}
            >
              <Image
                style={{ filter: 'brightness(100)' }}
                src={'/image/logo_google.png'}
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
              href={`${process.env.NEXT_PUBLIC_API}/login/kakao?redirect_url=${redirectUrl}`}
              onClick={() => {
                trackLoginButtonClick();
              }}
            >
              <Image
                style={{ filter: 'invert(100%)' }}
                src={'/image/logo_kakao.svg'}
                alt="Kakao Logo"
                width={20}
                height={20}
              />
              Sign up with Kakao
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
