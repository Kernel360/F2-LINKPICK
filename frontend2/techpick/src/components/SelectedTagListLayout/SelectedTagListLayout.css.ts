import { style, styleVariants } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const ListLayoutHeightVariants = styleVariants({
  fixed: {
    overflow: 'hidden',
    minHeight: '30px',
    maxHeight: '58px',
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
    border: `1px solid ${colorVars.color.inputBorderFocus}`,
  },
  none: {},
});

export type SelectedTagListLayoutFocusStyleVarianKeyTypes =
  keyof typeof SelectedTagListLayoutFocusStyleVariant;

export const SelectedTagListLayoutStyle = style({
  display: 'flex',
  gap: '4px',
  flexWrap: 'wrap',
  padding: '4px',
  width: '288px',
  overflowY: 'scroll',
});
