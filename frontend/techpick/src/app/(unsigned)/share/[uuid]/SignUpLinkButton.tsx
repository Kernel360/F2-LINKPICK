'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants';
import { useEventLogger } from '@/hooks';
import { signUpButtonStyle } from './page.css';

export function SignUpLinkButton() {
  const { trackEvent: trackSignUpButtonClick } = useEventLogger({
    eventName: 'shared_page_sign_up_button_click',
  });

  return (
    <Link
      href={ROUTES.LOGIN}
      onClick={trackSignUpButtonClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          trackSignUpButtonClick();
        }
      }}
    >
      <button className={signUpButtonStyle}>회원가입</button>
    </Link>
  );
}
