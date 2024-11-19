import { style } from '@vanilla-extract/css';
import { sizes, space } from 'techpick-shared';

export const pickListItemLayoutStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space['12'],
  width: sizes['full'],
  height: sizes['full'],
  overflowY: 'scroll',
});
