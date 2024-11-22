import { style } from '@vanilla-extract/css';

export const indicatorLayoutStyle = style({});

export const indicatorBodyLayoutStyle = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 36px',
  gap: '16px',
});

export const indicatorTitleStyle = style({
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});
