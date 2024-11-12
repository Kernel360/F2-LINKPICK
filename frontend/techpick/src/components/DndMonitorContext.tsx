'use client';

import { PropsWithChildren } from 'react';
import { usePickToPickDndMonitor, useFolderToFolderDndMonitor } from '@/hooks';

export function DndMonitorContext({ children }: PropsWithChildren) {
  usePickToPickDndMonitor();
  useFolderToFolderDndMonitor();

  return <>{children}</>;
}
