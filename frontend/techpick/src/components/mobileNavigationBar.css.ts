import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const mobileNavigationHeight = '44px';

export const mobileNavigationBarStyle = style({
  position: 'sticky',
  top: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: mobileNavigationHeight,
  padding: '12px',
  backgroundColor: colorVars.gold3,
});

export const titleSectionStyle = style({
  display: 'flex',
  gap: '8px',
});

export const titleStyle = style({
  flex: '1 0',
  maxWidth: '60vw',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

export const actionsStyle = style({
  display: 'flex',
  gap: '12px',
});

export const buttonStyle = style({
  padding: '0 4px',
});
