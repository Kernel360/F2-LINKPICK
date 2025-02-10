import { style } from '@vanilla-extract/css';

export const loadingContainer = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'height 0.5s ease',
  overflow: 'hidden',
});
