import { style } from '@vanilla-extract/css';
import { space, sizes } from 'techpick-shared';

export const pickCardGridLayoutStyle = style({
  display: 'grid',
  // 280px는 PickCard의 width
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  padding: space[8],
  rowGap: space[8],
  columnGap: space[8],
  width: sizes['full'],
  height: sizes['full'],
  overflowY: 'scroll',
});
