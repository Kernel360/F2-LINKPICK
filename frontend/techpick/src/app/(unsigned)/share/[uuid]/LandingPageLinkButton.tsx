'use client';

import { ROUTES } from '@/constants/route';
import { useEventLogger } from '@/libs/@eventlog/useEventLogger';
import Link from 'next/link';
import { homeNavigateButtonStyle } from './page.css';

export function LandingPageLinkButton() {
  const { trackEvent: trackLandingPageLinkButtonClick } = useEventLogger({
    eventName: 'shared_page_landing_link_button_click',
  });

  return (
    <Link
      href={ROUTES.LANDING}
      onClick={() => {
        trackLandingPageLinkButtonClick();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          trackLandingPageLinkButtonClick();
        }
      }}
    >
      <button type="button" className={homeNavigateButtonStyle}>
        바구니란?
      </button>
    </Link>
  );
}
