import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export const isMobileDevice = async () => {
  'use server';
  const headersList = headers();
  const { device } = userAgent({ headers: headersList });
  return device.type === 'mobile';
};
