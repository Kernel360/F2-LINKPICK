import { style } from '@vanilla-extract/css';

export const searchListContainer = style({
  height: '400px',
  width: '100%',
});

export const searchResultListStyle = style({
  overflowY: 'auto',

  '::-webkit-scrollbar': {
    display: 'none',
  },
});
