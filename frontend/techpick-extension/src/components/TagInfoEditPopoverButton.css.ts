import { style } from '@vanilla-extract/css';
import { color } from 'techpick-shared';

export const tagInfoEditFormLayout = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  zIndex: '3',
  borderRadius: '4px',
  padding: '8px',
  backgroundColor: color.background,
  boxShadow:
    'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px',
});

export const tagInputStyle = style({
  outline: 'none',
  border: `1px solid ${color.font}`,
  color: color.font,
});

export const popoverOverlayStyle = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 2,
  backgroundColor: 'rgba(0, 0, 0, 0)',
});
