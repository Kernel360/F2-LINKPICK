import { style } from '@vanilla-extract/css';

export const userMenuBarLayoutStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: '12px',
  marginRight: '8px',
});

export const myPageLinkStyle = style({
  height: '24px',
});

export const searchButtonStyle = style({
  height: '24px',
  ':hover': {
    cursor: 'pointer',
  },
});
