'use client';

import { PropsWithChildren } from 'react';
import {
  usePickToPickDndMonitor,
  useFolderToFolderDndMonitor,
  usePickToFolderDndMonitor,
} from '@/hooks';

export function DndMonitorContext({ children }: PropsWithChildren) {
  usePickToPickDndMonitor();
  useFolderToFolderDndMonitor();
  usePickToFolderDndMonitor();

  return <>{children}</>;
}
