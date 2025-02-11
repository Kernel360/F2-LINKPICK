import { drawerContentStyle } from '@/styles/drawerStyle.css';
import { style } from '@vanilla-extract/css';

export const searchDrawerHeight = '85vh';

export const contentStyle = style([
  drawerContentStyle,
  {
    height: searchDrawerHeight,
  },
]);
