import { style } from '@vanilla-extract/css';

export const stackedItem = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'white',
  borderRadius: '4px',
  border: '1px solid #ccc',
  pointerEvents: 'none',
  top: 0,
  left: 0,
});
