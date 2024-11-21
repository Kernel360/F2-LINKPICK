import { style, styleVariants } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const buttonSizeVariants = styleVariants({
  xs: {
    height: '24px',
    padding: '0 4px',
    fontSize: '0.75rem', // 12px
  },
  sm: {
    height: '28px',
    padding: '0 4px',
    fontSize: '0.875rem', // 14px
  },
  md: {
    height: '32px',
    padding: '0 8px',
    fontSize: '1rem', // 16px
  },
  lg: {
    height: '40px',
    padding: '0 12px',
    fontSize: '1.125rem', // 18px
  },
  xl: {
    height: '56px',
    padding: '0 16px',
    fontSize: '1.25rem', // 20px
  },
});

export type buttonSizeVariantKeyTypes = keyof typeof buttonSizeVariants;

export const buttonColorVariants = styleVariants({
  black: {
    color: 'black',
  },
  white: {
    color: 'white',
  },
  primary: {
    color: colorVars.primary,
  },
  secondary: {
    color: colorVars.secondary,
  },
  default: {
    color: colorVars.secondary,
  },
  warning: {
    color: colorVars.red2,
  },
});
export type buttonColorVariantKeyTypes = keyof typeof buttonColorVariants;

export const buttonBackgroundVariants = styleVariants({
  primary: {
    backgroundColor: colorVars.blue8,
  },
  secondary: {
    backgroundColor: colorVars.secondary,
  },
  white: {
    backgroundColor: colorVars.white,
  },
  default: {
    backgroundColor: colorVars.neutral,
  },
  warning: {
    backgroundColor: colorVars.orange8,
  },
});

export type buttonBackgroundVariantKeyTypes =
  keyof typeof buttonBackgroundVariants;

export const buttonStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  cursor: 'pointer',
  borderRadius: '4px',
  border: '1px solid transparent',

  ':hover': {
    transition: 'background-color 0.3s ease',
  },

  ':focus': {
    outline: 'none',
    transition: 'background-color 0.3s ease',
  },

  selectors: {
    '&[data-variant="primary"]:hover, &[data-variant="primary"]:focus': {
      backgroundColor: colorVars.blue10,
    },

    '&[data-variant="warning"]:hover, &[data-variant="warning"]:focus': {
      backgroundColor: colorVars.orange10,
    },
  },
});

export const wideButtonStyle = style({
  width: '100%',
});
