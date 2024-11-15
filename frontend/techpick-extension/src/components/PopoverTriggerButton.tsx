import { forwardRef, MouseEvent } from 'react';
import { Ellipsis } from 'lucide-react';
import { PopoverTriggerButtonStyle } from './PopoverTriggerButton.css';

export const PopoverTriggerButton = forwardRef<
  HTMLDivElement,
  { onClick?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void }
>(function PopoverTriggerButtonWithRef({ onClick = () => {} }, ref) {
  return (
    <div
      className={PopoverTriggerButtonStyle}
      ref={ref}
      role="button"
      onClick={onClick}
    >
      <Ellipsis size={14} />
    </div>
  );
});
