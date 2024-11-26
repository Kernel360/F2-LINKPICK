import { style } from '@vanilla-extract/css';
import { sizes, space } from 'techpick-shared';

export const folderContentLayoutStyle = style({
  width: '100%',
  height: '100vh',
  flexShrink: 1,
  minWidth: 0,
  position: 'relative',
  overflowY: 'scroll',
  padding: space['24'],

  '@media': {
    'screen and (min-width: 1440px)': {
      minWidth: sizes['3xs'],
    },
  },
});
