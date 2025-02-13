'use server';

import { ROUTES } from '@/constants/route';
import { ScreenLogger } from '@/libs/@eventlog/ScreenLogger';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { PropsWithChildren } from 'react';

export default async function LoginPageLayout({ children }: PropsWithChildren) {
  const authToken = cookies().get('access_token');

  if (authToken) {
    redirect(ROUTES.HOME);
  }

  return <ScreenLogger eventName="login_page_view">{children}</ScreenLogger>;
}
