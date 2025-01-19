'use client';

import type { MouseEvent } from 'react';
import { popoverOverlayStyle } from './TagInfoEditPopoverButton.css';

export function PopoverOverlay({
  onClick = () => {},
}: {
  onClick?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
}) {
  // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
  return <div className={popoverOverlayStyle} onClick={onClick} />;
}
