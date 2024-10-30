import { style, styleVariants } from '@vanilla-extract/css';
import { color } from 'techpick-shared';
import { ChipCommonStyle } from './ChipItemCommonStyle';

export const ListLayoutHeightVariants = styleVariants({
  fixed: {
    overflow: 'hidden',
    minHeight: '30px',
    maxHeight: '60px',
  },
  flexible: {
    overflow: 'visible',
    minHeight: '30px',
  },
});

export type ListLayoutHeightVariantKeyTypes =
  keyof typeof ListLayoutHeightVariants;

export const ChipItemListLayoutFocusStyleVariant = styleVariants({
  focus: {
    border: `1px solid ${color.inputBorderFocus}`,
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },
  none: {},
});

export type ChipItemListLayoutFocusStyleVarianKeyTypes =
  keyof typeof ChipItemListLayoutFocusStyleVariant;

export const ChipItemListLayoutStyle = style({
  border: '1px solid blue',
  display: 'flex',
  gap: '4px',
  flexWrap: 'wrap',
  padding: '4px',
  width: ChipCommonStyle.width,
});
