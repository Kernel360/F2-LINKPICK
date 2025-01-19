import { Ellipsis } from 'lucide-react';
import { type MouseEvent, forwardRef } from 'react';
import { PopoverTriggerButtonStyle } from './PopoverTriggerButton.css';

export const PopoverTriggerButton = forwardRef<
  HTMLDivElement,
  { onClick?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void }
>(function PopoverTriggerButtonWithRef({ onClick = () => {} }, ref) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
    <div
      className={PopoverTriggerButtonStyle}
      ref={ref}
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role="button"
      onClick={onClick}
    >
      <Ellipsis size={14} />
    </div>
  );
});
