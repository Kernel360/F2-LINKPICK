import { style } from '@vanilla-extract/css';
import { space } from 'techpick-shared';

export const gridLayout = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // 280px는 PickCard의 width
  padding: space[16],
  rowGap: space[16],
  columnGap: space[16],
});
