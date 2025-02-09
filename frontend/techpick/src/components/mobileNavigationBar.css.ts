import { style } from '@vanilla-extract/css';

export const mobileNavigationBarStyle = style({
  position: 'sticky',
  top: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '44px',
});

export const actionsStyle = style({
  display: 'flex',
  gap: '12px',
});

export const buttonStyle = style({
  padding: '0 4px',
});
