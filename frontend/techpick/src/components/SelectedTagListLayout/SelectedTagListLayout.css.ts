import { style, styleVariants } from '@vanilla-extract/css';
import { color, space } from 'techpick-shared';

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

export const SelectedTagListLayoutFocusStyleVariant = styleVariants({
  focus: {
    border: `1px solid ${color.inputBorderFocus}`,
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },
  none: {},
});

export type SelectedTagListLayoutFocusStyleVarianKeyTypes =
  keyof typeof SelectedTagListLayoutFocusStyleVariant;

export const SelectedTagListLayoutStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['4'],
  flexWrap: 'wrap',
});
