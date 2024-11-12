import { style } from '@vanilla-extract/css';
import { sizes, space } from 'techpick-shared';

export const pageContainerLayout = style({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
});

export const ListViewerLayout = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  padding: space['8'],

  '@media': {
    'screen and (min-width: 1440px)': {
      minWidth: sizes['3xs'],
    },
  },
});
