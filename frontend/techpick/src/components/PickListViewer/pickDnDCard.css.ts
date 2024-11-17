import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const selectedDragItemStyle = style({
  backgroundColor: colorVars.primary,
  userSelect: 'none',
});

export const isActiveDraggingItemStyle = style({
  opacity: 0,
});
