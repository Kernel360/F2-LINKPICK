'use client';

import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { Resizable } from 're-resizable';
export function HorizontalResizableContainer({ children }: PropsWithChildren) {
  const [minWidth, setMinWidth] = useState('192px');

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

  return (
    <Resizable
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
    >
      {children}
    </Resizable>
  );
}
