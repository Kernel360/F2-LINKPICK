import { style, styleVariants } from '@vanilla-extract/css';
import { colorThemeContract, commonTheme } from 'techpick-shared';

export const fontSizeVariants = styleVariants({
  xs: { fontSize: '0.75rem' }, // 12
  sm: { fontSize: '0.875rem' }, // 14
  md: { fontSize: '1rem' }, // 16
  lg: { fontSize: '1.125rem' }, // 18
  xl: { fontSize: '1.25rem' }, // 20
  '2xl': { fontSize: '1.5rem' }, // 24
});

export type fontSizeVariantKeyTypes = keyof typeof fontSizeVariants;

const { fontWeights } = commonTheme.typography;

export const fontWeightVariants = styleVariants({
  regular: { fontWeight: fontWeights.medium },
  semibold: { fontWeight: fontWeights.semibold },
  bold: { fontWeight: fontWeights.bold },
  extrabold: { fontWeight: fontWeights.extrabold },
});

export type fontWeightVariantKeyTypes = keyof typeof fontWeightVariants;

export const textStyle = style({
  color: colorThemeContract.color.font,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});
