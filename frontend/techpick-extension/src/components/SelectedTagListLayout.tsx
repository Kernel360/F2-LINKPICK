import { type PropsWithChildren, forwardRef } from 'react';
import {
  type ListLayoutHeightVariantKeyTypes,
  ListLayoutHeightVariants,
  type SelectedTagListLayoutFocusStyleVarianKeyTypes,
  SelectedTagListLayoutFocusStyleVariant,
  SelectedTagListLayoutStyle,
} from './SelectedTagListLayout.css';

export const SelectedTagListLayout = forwardRef<
  HTMLDivElement,
  PropsWithChildren<SelectedTagListLayoutProps>
>(function SelectedTagListLayoutWithRef(
  { height = 'flexible', focusStyle = 'none', children },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`${ListLayoutHeightVariants[height]} ${SelectedTagListLayoutFocusStyleVariant[focusStyle]} ${SelectedTagListLayoutStyle}`}
    >
      {children}
    </div>
  );
});

interface SelectedTagListLayoutProps {
  height?: ListLayoutHeightVariantKeyTypes;
  focusStyle?: SelectedTagListLayoutFocusStyleVarianKeyTypes;
}
