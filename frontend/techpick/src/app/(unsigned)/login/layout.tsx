'use server';

import { ScreenLogger } from '@/components/ScreenLogger';
import { ROUTES } from '@/constants/route';
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
