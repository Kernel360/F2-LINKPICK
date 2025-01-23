import { style } from '@vanilla-extract/css';
import { colorVars, sizes } from 'techpick-shared';

export const basicNavigationItemListLayoutStyle = style({
  position: 'sticky',
  top: 0,
  minWidth: sizes['6xs'],
  backgroundColor: colorVars.gold3,
});
