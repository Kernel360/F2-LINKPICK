import { style } from '@vanilla-extract/css';
import { colorThemeContract } from 'techpick-shared';

export const selectedDragItemStyle = style({
  backgroundColor: colorThemeContract.primary,
  userSelect: 'none',
});

export const isActiveDraggingItemStyle = style({
  opacity: 0,
});
