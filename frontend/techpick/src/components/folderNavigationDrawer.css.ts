import { drawerContentStyle } from '@/styles/drawerStyle.css';
import { style } from '@vanilla-extract/css';

export const contentStyle = style([
  drawerContentStyle,
  {
    height: '85vh',
  },
]);
