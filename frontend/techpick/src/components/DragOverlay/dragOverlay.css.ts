// dragOverlay.css.ts
import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const scaledDownStyle = style({
  transform: 'scale(0.8)',
});

export const stackedOverlayStyle = style({
  position: 'relative',
});

export const dragCountStyle = style({
  position: 'absolute',
  top: '-8px',
  right: '-8px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '32px',
  height: '32px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  borderRadius: '50%',
  background: colorVars.primary,
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  zIndex: 1,
});
