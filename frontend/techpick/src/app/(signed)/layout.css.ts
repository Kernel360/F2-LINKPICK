import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const pageContainerLayout = style({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
});

export const mobilePageContainerStyle = style({
  width: '100%',
  height: '100vh',
  padding: '0 12px',
  backgroundColor: colorVars.gold2,
  overflowY: 'auto',
});
