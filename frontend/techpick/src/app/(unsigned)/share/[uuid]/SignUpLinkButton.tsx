'use client';

import { ROUTES } from '@/constants/route';
import { useEventLogger } from '@/hooks/useEventLogger';
import Link from 'next/link';
import { signUpButtonStyle } from './page.css';

export function SignUpLinkButton() {
  const { trackEvent: trackSignUpButtonClick } = useEventLogger({
    eventName: 'shared_page_sign_up_button_click',
  });

  return (
    <Link
      href={ROUTES.LOGIN}
      onClick={() => {
        trackSignUpButtonClick();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          trackSignUpButtonClick();
        }
      }}
    >
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button className={signUpButtonStyle}>회원가입</button>
    </Link>
  );
}
