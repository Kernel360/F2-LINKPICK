'use client';

import { Toaster } from 'react-hot-toast';

function ToastProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}

export { ToastProvider };
