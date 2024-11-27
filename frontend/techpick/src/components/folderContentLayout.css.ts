import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const folderContentLayoutStyle = style({
  width: '100%',
  height: '100vh',
  flexShrink: 1,
  minWidth: 0,
  position: 'relative',
  overflowY: 'scroll',
  backgroundColor: colorVars.gold2,
});
