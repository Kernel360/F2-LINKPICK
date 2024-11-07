import { style } from '@vanilla-extract/css';
import { colorThemeContract, sizes } from 'techpick-shared';

export const folderTreeHeaderLayout = style({
  position: 'sticky',
  top: 0,
  minWidth: sizes['6xs'],
  backgroundColor: colorThemeContract.backgroundBase,
});
