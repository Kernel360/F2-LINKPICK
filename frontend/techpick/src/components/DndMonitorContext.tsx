'use client';

import { PropsWithChildren } from 'react';
import {
  usePickToPickDndMonitor,
  useFolderToFolderDndMonitor,
  usePickToFolderDndMonitor,
  useRecommendPickToFolderDndMonitor,
} from '@/hooks';

export function DndMonitorContext({ children }: PropsWithChildren) {
  usePickToPickDndMonitor();
  useFolderToFolderDndMonitor();
  usePickToFolderDndMonitor();
  useRecommendPickToFolderDndMonitor();
  return <>{children}</>;
}
