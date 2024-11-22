'use server';

import type { PropsWithChildren } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';

export default async function LoginPageLayout({ children }: PropsWithChildren) {
  const authToken = cookies().get('access_token');

  if (authToken) {
    redirect(ROUTES.HOME);
  }

  return children;
}
