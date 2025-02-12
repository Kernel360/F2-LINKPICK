import { keyframes, style } from '@vanilla-extract/css';

export const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const spinnerStyle = style({
  width: '30px',
  height: '30px',
  transition: 'transform 0.3s ease',
});

export const spinnerCircleStyle = style({
  width: '100%',
  height: '100%',
});

export const spinAnimation = style({
  animation: `${spin} 1s linear infinite`,
});
