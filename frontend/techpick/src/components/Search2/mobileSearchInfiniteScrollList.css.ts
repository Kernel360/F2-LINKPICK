import { style } from '@vanilla-extract/css';
import { searchDrawerHeight } from './searchDrawer.css';

export const mobileSearchInfiniteScrollList = style({
  width: '100%',
  height: `calc(${searchDrawerHeight} - 88px)`,
});
