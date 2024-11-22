import { MouseEvent } from 'react';
import { popoverOverlayStyle } from './TagInfoEditPopoverButton.css';

export function PopoverOverlay({
  onClick = () => {},
}: {
  onClick?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
}) {
  return <div className={popoverOverlayStyle} onClick={onClick} />;
}
