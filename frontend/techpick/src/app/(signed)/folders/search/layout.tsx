import { Suspense } from 'react';
import type { PropsWithChildren } from 'react';

export default function SearchPickResultLayout({
  children,
}: PropsWithChildren) {
  return <Suspense>{children}</Suspense>;
}
