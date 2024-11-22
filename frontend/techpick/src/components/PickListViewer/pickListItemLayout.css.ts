import { style } from '@vanilla-extract/css';
import { sizes } from 'techpick-shared';

export const pickListItemLayoutStyle = style({
  width: sizes['full'],
  height: sizes['full'],
  overflowY: 'scroll',
});
