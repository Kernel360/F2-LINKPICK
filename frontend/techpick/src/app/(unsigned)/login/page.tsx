'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getClientCookie } from '@/utils';
import {
  googleLoginContainer,
  kakaoLoginContainer,
  screenContainer,
  loginLink,
  loginBlockContainer,
  pickIconContainer,
  pickBrandContainer,
  dividerStyle,
  pickBrandContainerWithText,
} from './page.css';

export default function LoginPage() {
  const redirectUrl = encodeURIComponent(
    process.env.NEXT_PUBLIC_REDIRECT_URL ?? ''
  );

  useEffect(() => {
    const isLoggedInCookie = getClientCookie('techPickLogin');

    if (isLoggedInCookie) {
      redirect('/');
    }
  }, []);

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
        <div style={{ padding: '36px 0' }}>
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
        </div>
      </div>
    </div>
  );
}
