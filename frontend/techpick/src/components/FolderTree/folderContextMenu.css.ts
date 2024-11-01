import { style } from '@vanilla-extract/css';
import {
  colorThemeContract,
  sizes,
  space,
  borderRadius,
} from 'techpick-shared';

export const contextMenuContentLayout = style({
  width: sizes['min'],
  height: sizes['min'],
  border: '1px solid',
  borderColor: colorThemeContract.borderNeutral,
  borderRadius: borderRadius['base'],
  backgroundColor: colorThemeContract.backgroundBase,
});

export const contextMenuItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['8'],
  width: sizes['7xs'],
  height: sizes['12xs'],
  borderRadius: borderRadius['base'],
  padding: space['8'],
  cursor: 'pointer',

  selectors: {
    '&[data-highlighted]': {
      outline: colorThemeContract.primaryFaded,
      backgroundColor: colorThemeContract.primary,
    },
  },
});
