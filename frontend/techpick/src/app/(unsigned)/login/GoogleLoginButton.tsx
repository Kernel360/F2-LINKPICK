'use client';

import { useEventLogger } from '@/libs/@eventlog/useEventLogger';
import Image from 'next/image';
import Link from 'next/link';
import {
  loginContainer,
  loginContainerLayoutStyle,
  loginLink,
} from './page.css';

export function LoginButtonSection() {
  const redirectUrl = encodeURIComponent(
    process.env.NEXT_PUBLIC_REDIRECT_URL ?? '',
  );
  const { trackEvent: trackLoginButtonClick } = useEventLogger({
    eventName: 'login_page_login_button_click',
  });

  return (
    <div className={loginContainerLayoutStyle}>
      <div className={loginContainer}>
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
      <div className={loginContainer}>
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
  );
}
