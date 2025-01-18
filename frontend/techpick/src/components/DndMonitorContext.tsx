'use client';

import { useFolderToFolderDndMonitor } from '@/hooks/useFolderToFolderDndMonitor';
import { usePickToFolderDndMonitor } from '@/hooks/usePickToFolderDndMonitor';
import { usePickToPickDndMonitor } from '@/hooks/usePickToPickDndMonitor';
import { useRecommendPickToFolderDndMonitor } from '@/hooks/useRecommendPickToFolderDndMonitor';
import type { PropsWithChildren } from 'react';

export function DndMonitorContext({ children }: PropsWithChildren) {
  usePickToPickDndMonitor();
  useFolderToFolderDndMonitor();
  usePickToFolderDndMonitor();
  useRecommendPickToFolderDndMonitor();
  return <>{children}</>;
}
