import { PropsWithChildren, forwardRef } from 'react';
import {
  ChipItemListLayoutStyle,
  ListLayoutHeightVariantKeyTypes,
  ListLayoutHeightVariants,
  ChipItemListLayoutFocusStyleVarianKeyTypes,
  ChipItemListLayoutFocusStyleVariant,
} from './ChipItemList.css';

export const ChipItemList = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ChipItemListLayoutProps>
>(function ChipItemListLayoutWithRef(
  { height = 'flexible', focusStyle = 'none', children },
  ref
) {
  return (
    <div
      ref={ref}
      className={`${ListLayoutHeightVariants[height]} ${ChipItemListLayoutFocusStyleVariant[focusStyle]} ${ChipItemListLayoutStyle}`}
    >
      {children}
    </div>
  );
});

interface ChipItemListLayoutProps {
  height?: ListLayoutHeightVariantKeyTypes;
  focusStyle?: ChipItemListLayoutFocusStyleVarianKeyTypes;
}
