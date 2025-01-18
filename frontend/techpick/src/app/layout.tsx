import { QueryProvider } from '@/providers/QueryProvider';
import { Noto_Sans_KR } from 'next/font/google';
import '@/styles/reset.css';
import { PORTAL_CONTAINER_ID } from '@/constants/portalContainerId';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { UserIdentifyProvider } from '@/providers/UserIdentifyProvider';
import { getUserIdForServer } from '@/utils/getUserIdForServer';
import type { Metadata } from 'next';

const notoSansKR = Noto_Sans_KR({ weight: 'variable', subsets: ['latin'] });
export const metadata: Metadata = {
  title: '바구니 | 깔끔한 북마크 관리',
  description: '깔끔한 북마크 관리, 바구니',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_IMAGE_URL}/image/og_image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getUserIdForServer();

  return (
    <html lang="en">
      <UserIdentifyProvider userId={userId}>
        <ThemeProvider classname={`${notoSansKR.className}`}>
          <ToastProvider>
            <QueryProvider>
              {children}
              <div id={PORTAL_CONTAINER_ID} />
            </QueryProvider>
          </ToastProvider>
        </ThemeProvider>
      </UserIdentifyProvider>
    </html>
  );
}
