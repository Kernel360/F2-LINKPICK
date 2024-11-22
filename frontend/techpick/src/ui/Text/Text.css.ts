import { style, styleVariants } from '@vanilla-extract/css';
import { colorVars, commonTheme, typography } from 'techpick-shared';

export const fontSizeVariants = styleVariants({
  xs: { fontSize: '0.75rem' }, // 12
  sm: { fontSize: '0.875rem' }, // 14
  md: { fontSize: '1rem' }, // 16
  lg: { fontSize: '1.125rem' }, // 18
  xl: { fontSize: '1.25rem' }, // 20
  '2xl': { fontSize: typography.fontSize['2xl'] }, // 24
  '4xl': { fontSize: typography.fontSize['4xl'] },
  '8xl': { fontSize: typography.fontSize['8xl'] },
});

export type fontSizeVariantKeyTypes = keyof typeof fontSizeVariants;

const { fontWeights } = commonTheme.typography;

export const fontWeightVariants = styleVariants({
  hairline: { fontWeight: fontWeights.hairline },
  thin: { fontWeight: fontWeights.thin },
  light: { fontWeight: fontWeights.light },
  regular: { fontWeight: fontWeights.medium },
  semibold: { fontWeight: fontWeights.semibold },
  bold: { fontWeight: fontWeights.bold },
  extrabold: { fontWeight: fontWeights.extrabold },
});

export type fontWeightVariantKeyTypes = keyof typeof fontWeightVariants;

export const textStyle = style({
  color: colorVars.text,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
