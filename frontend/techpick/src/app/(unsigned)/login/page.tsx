'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getClientCookie } from '@/utils';
import {
  googleLoginContainer,
  kakaoLoginContainer,
  loginContainer,
  loginLink,
  logoContainer,
} from './page.css';

export default function LoginPage() {
  useEffect(() => {
    const isLoggedInCookie = getClientCookie('techPickLogin');

    if (isLoggedInCookie) {
      redirect('/');
    }
  }, []);

  return (
    <div className={loginContainer}>
      <div className={logoContainer}>
        <Image
          src={`/image/logo_techpick.png`}
          alt="TechPick Logo"
          width={220}
          height={220}
        />

        <div className={googleLoginContainer}>
          <Link
            className={loginLink}
            href={`${process.env.NEXT_PUBLIC_API}/login/google`}
          >
            <Image
              src={`/image/logo_google.png`}
              alt="Google Logo"
              width={24}
              height={24}
            />
            <span>Sign up with Google</span>
          </Link>
        </div>
        <div className={kakaoLoginContainer}>
          <Link
            className={loginLink}
            href={`${process.env.NEXT_PUBLIC_API}/login/kakao`}
          >
            <Image
              src={`/image/logo_kakao.svg`}
              alt="Kakao Logo"
              width={24}
              height={24}
            />
            Sign up with Kakao
          </Link>
        </div>
      </div>
    </div>
  );
}
