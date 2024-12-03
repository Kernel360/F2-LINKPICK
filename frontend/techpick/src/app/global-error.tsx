'use client';

import { useEffect } from 'react';
import Error from 'next/error';
import * as Sentry from '@sentry/nextjs';
import { errorBody ,errorHeading, retryButton } from './global-error.css'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body className={errorBody}>
        <h2 className={errorHeading}>Something went wrong!</h2>
        <button onClick={() => reset()} className={retryButton}>Try again</button>
      </body>
    </html>
  );
}
