'use client';

import type { PropsWithChildren } from 'react';
import { Resizable } from 're-resizable';
import { horizontalResizingContainerLayout } from '@/components/FolderTree/tree.css';
export function HorizontalResizableContainer({ children }: PropsWithChildren) {
  const minWidth = '200px';
  const MAX_WIDTH = '600px';

  return (
    <Resizable
      className={horizontalResizingContainerLayout}
      enable={{
        right: true,
        top: false,
        bottom: false,
        left: false,
        bottomLeft: false,
        bottomRight: false,
        topLeft: false,
        topRight: false,
      }}
      minWidth={minWidth}
      maxWidth={MAX_WIDTH}
      defaultSize={{
        width: minWidth,
      }}
    >
      {children}
    </Resizable>
  );
}
