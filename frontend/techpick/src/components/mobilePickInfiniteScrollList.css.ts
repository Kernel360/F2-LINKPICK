import { style } from '@vanilla-extract/css';

export const mobilePickInfiniteScrollListStyle = style({
  height: 'calc(100vh - 64px)',
});

export const emptyPickListLayoutStyle = style({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
});
