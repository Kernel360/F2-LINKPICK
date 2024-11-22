'use client';

import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { Resizable } from 're-resizable';
import {
  horizontalResizingContainerLayout,
  resizeHandleStyle,
} from '@/components/FolderTree/tree.css';
export function HorizontalResizableContainer({ children }: PropsWithChildren) {
  const [minWidth, setMinWidth] = useState('192px');
  const MAX_WIDTH = '600px';

  const updateMinWidth = () => {
    const curWidth = window.innerWidth < 1440 ? '192px' : '256px';
    setMinWidth(curWidth);
  };

  useEffect(function onHorizontalResizableContainerLoad() {
    updateMinWidth();

    window.addEventListener('resize', updateMinWidth);

    return () => {
      window.removeEventListener('resize', updateMinWidth);
    };
  }, []);

  const Handle = () => (
    <div className={resizeHandleStyle}>{/*<ArrowRightIcon />*/}</div>
  );

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
      handleComponent={{
        right: <Handle />,
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
