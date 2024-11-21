import { Noto_Sans_KR } from 'next/font/google';
import { PORTAL_CONTAINER_ID } from '@/constants';
import { ToastProvider, ThemeProvider } from '@/providers';
import { QueryProvider } from '@/providers/QueryProvider';
import type { Metadata } from 'next';
import '@/styles/reset.css';

const notoSansKR = Noto_Sans_KR({ weight: 'variable', subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Techpick',
  description: 'quick save, view anywhere',
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansKR.className}`}>
        <ToastProvider>
          <ThemeProvider>
            <QueryProvider>
              {children}
              <div id={PORTAL_CONTAINER_ID} />
            </QueryProvider>
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
