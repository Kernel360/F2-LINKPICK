import { style } from '@vanilla-extract/css';

export const baseButtonStyle = style({
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  outline: 'none',
});

export const outlineButtonStyle = style({
  border: '1px solid',
  backgroundColor: 'transparent',
});
