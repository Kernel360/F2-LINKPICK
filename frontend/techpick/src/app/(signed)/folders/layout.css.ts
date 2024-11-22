import { style } from '@vanilla-extract/css';
import { colorVars, sizes } from 'techpick-shared';

export const pageContainerLayout = style({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
});

export const ListViewerLayout = style({
  width: '100%',
  height: '100vh',
  flexShrink: 1,
  minWidth: 0,
  position: 'relative',

  '@media': {
    'screen and (min-width: 1440px)': {
      minWidth: sizes['3xs'],
    },
  },
});

export const ListViewerHeaderLayout = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1116px',
  borderBottom: `2px solid ${colorVars.neutral}`,
});

// search module + add button
export const ListViewerHeaderMainLayout = style({
  padding: '24px 36px',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: '0.3s ease',
});

// indicator module layout (title + location)
export const ListViewerHeaderBodyLayout = style({});

export const qnaSection = style({
  position: 'absolute',
  bottom: '32px',
  right: '32px',
});
//
