import { Noto_Sans_KR } from 'next/font/google';
import { PORTAL_CONTAINER_ID } from '@/constants';
import { ToastProvider, ThemeProvider } from '@/providers';
import { QueryProvider } from '@/providers/QueryProvider';
import type { Metadata } from 'next';
import '@/styles/reset.css';

const notoSansKR = Noto_Sans_KR({ weight: 'variable', subsets: ['latin'] });
export const metadata: Metadata = {
  title: '바구니 | 깔끔한 북마크 관리',
  description: '깔끔한 북마크 관리, 바구니',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: `/image/og_image.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider classname={`${notoSansKR.className}`}>
        <ToastProvider>
          <QueryProvider>
            {children}
            <div id={PORTAL_CONTAINER_ID} />
          </QueryProvider>
        </ToastProvider>
      </ThemeProvider>
    </html>
  );
}
