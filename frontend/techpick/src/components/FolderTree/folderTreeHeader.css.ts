import { style } from '@vanilla-extract/css';
import { colorVars, sizes, space } from 'techpick-shared';

export const folderTreeHeaderLayout = style({
  position: 'sticky',
  top: 0,
  minWidth: sizes['6xs'],
  backgroundColor: colorVars.backgroundNeutral,
});

export const dividerStyle = style({
  margin: `${space['12']} 0`,
});
