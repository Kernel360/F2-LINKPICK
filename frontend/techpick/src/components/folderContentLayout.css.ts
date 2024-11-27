import { style } from '@vanilla-extract/css';

export const folderContentLayoutStyle = style({
  width: '100%',
  height: '100vh',
  flexShrink: 1,
  minWidth: 0,
  position: 'relative',
  overflowY: 'scroll',
});
