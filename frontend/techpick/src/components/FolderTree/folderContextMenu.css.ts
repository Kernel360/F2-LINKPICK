import { style } from '@vanilla-extract/css';
import { colorVars, sizes, space, borderRadius } from 'techpick-shared';

export const contextMenuContentLayout = style({
  width: sizes['min'],
  height: sizes['min'],
  border: '1px solid',
  borderColor: colorVars.gold7,
  borderRadius: borderRadius['base'],
  backgroundColor: colorVars.gold3,
});

export const contextMenuItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['4'],
  width: sizes['6xs'],
  height: '28px',
  borderRadius: borderRadius['base'],
  padding: space['8'],
  cursor: 'pointer',
  fontSize: '14px',

  selectors: {
    '&[data-highlighted]': {
      backgroundColor: colorVars.primary,
    },
  },
});
