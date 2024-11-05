import { style } from '@vanilla-extract/css';
import { colorThemeContract, sizes } from 'techpick-shared';

export const folderTreeHeaderLayout = style({
  display: 'flex',
  alignItems: 'center',
  height: '32px',
  position: 'sticky',
  top: 0,
  width: sizes['6xs'],
  backgroundColor: colorThemeContract.backgroundBase,
});
