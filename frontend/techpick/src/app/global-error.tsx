'use client';

import * as Sentry from '@sentry/nextjs';
import type NextError from 'next/error';
import { useEffect } from 'react';
import { errorBody, errorHeading, retryButton } from './global-error.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: NextError & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    // biome-ignore lint/a11y/useHtmlLang: <explanation>
    <html>
      <body className={errorBody}>
        <h2 className={errorHeading}>Something went wrong!</h2>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button onClick={() => reset()} className={retryButton}>
          Try again
        </button>
      </body>
    </html>
  );
}
