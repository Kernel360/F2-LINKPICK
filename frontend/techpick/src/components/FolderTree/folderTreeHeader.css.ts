import { style } from '@vanilla-extract/css';
import { colorThemeContract, sizes, space } from 'techpick-shared';

export const folderTreeHeaderLayout = style({
  position: 'sticky',
  top: 0,
  minWidth: sizes['6xs'],
  backgroundColor: colorThemeContract.backgroundNeutral,
});

export const dividerStyle = style({
  margin: `${space['12']} 0`,
});
