import { style } from '@vanilla-extract/css';
import { sizes, space } from 'techpick-shared';

export const pageContainerLayout = style({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
});

export const ListViewerLayout = style({
  width: '100%',
  height: '100vh',
  padding: space['32'],
  flexShrink: 1,
  minWidth: 0,

  '@media': {
    'screen and (min-width: 1440px)': {
      minWidth: sizes['3xs'],
    },
  },
});

export const ListViewerHeaderLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space['12'],
  marginBottom: space['16'],
});

// search module
export const ListViewerHeaderMainLayout = style({
  maxWidth: sizes['2xl'],
  minWidth: sizes['xs'],
});

// pathIndicator module
export const ListViewerHeaderSubLayout = style({});
