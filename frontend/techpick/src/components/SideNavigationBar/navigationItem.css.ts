import { style } from '@vanilla-extract/css';
import { colorVars, sizes, space, typography } from 'techpick-shared';

export const navigationItemLayoutStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['8'],
  minWidth: sizes['6xs'],
  height: '36px',
  borderRadius: '4px',
  padding: '8px 12px',
  fontSize: typography.fontSize.sm,
  cursor: 'grab',
  transition: 'background-color 0.2s',

  selectors: {
    '&:hover': {
      backgroundColor: colorVars.gold4,
    },
  },
});

export const activeStyle = style({
  backgroundColor: colorVars.gold5,
  color: colorVars.primary,
});

export const iconStyle = style({
  width: '16px',
  flexShrink: 0,
});

export const textStyle = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  height: '100%',
});
