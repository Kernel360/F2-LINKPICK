import { style } from '@vanilla-extract/css';
import { colorThemeContract } from 'techpick-shared';

export const folderTreeHeaderLayout = style({
  display: 'flex',
  alignItems: 'center',
  height: '32px',
  position: 'sticky',
  top: 0,
  backgroundColor: colorThemeContract.backgroundBase,
});
