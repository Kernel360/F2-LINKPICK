import * as RadixSeparator from '@radix-ui/react-separator';
import { separatorStyle } from './separator.css';

export function Separator() {
  return (
    <RadixSeparator.Root
      decorative
      orientation="vertical"
      className={separatorStyle}
    />
  );
}
