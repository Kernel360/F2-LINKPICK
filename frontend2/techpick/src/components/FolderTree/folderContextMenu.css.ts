import { style } from '@vanilla-extract/css';
import { colorVars, sizes, space, borderRadius } from 'techpick-shared';

export const contextMenuContentLayout = style({
  width: sizes['min'],
  height: sizes['min'],
  border: '1px solid',
  borderColor: colorVars.borderNeutral,
  borderRadius: borderRadius['base'],
  backgroundColor: colorVars.backgroundBase,
});

export const contextMenuItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['8'],
  width: sizes['6xs'],
  height: sizes['12xs'],
  borderRadius: borderRadius['base'],
  padding: space['8'],
  cursor: 'pointer',

  selectors: {
    '&[data-highlighted]': {
      outline: colorVars.primaryFaded,
      backgroundColor: colorVars.primary,
    },
  },
});
