import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const overlayStyle = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
});

export const searchDrawerHeight = '85vh';

export const contentStyle = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  height: searchDrawerHeight,
  outline: 'none',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  backgroundColor: colorVars.gold1,
});

export const contentInnerStyle = style({
  flexGrow: 1,
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  padding: '16px',
  backgroundColor: colorVars.gold1,
  overflowY: 'auto',
});

export const contentScrollableSectionStyle = style({
  maxWidth: '100%',
  margin: '0 auto',
});

export const handleStyle = style({
  width: '48px',
  height: '6px',
  margin: '0 auto',
  marginBottom: '24px',
  borderRadius: '9999px',
  backgroundColor: colorVars.sand7,
});

export const paragraph = style({
  color: '#4b5563',
});
