import { style } from '@vanilla-extract/css';
import { space } from 'techpick-shared';

export const folderContentLayoutStyle = style({
  maxWidth: '100%',
  height: '100vh',
  flexShrink: 1,
  minWidth: 0,
  position: 'relative',
  overflowY: 'scroll',
  padding: space['24'],
  margin: '0 auto',
});
