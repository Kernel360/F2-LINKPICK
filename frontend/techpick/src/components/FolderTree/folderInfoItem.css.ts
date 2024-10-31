import { style } from '@vanilla-extract/css';
import {
  colorThemeContract,
  sizes,
  space,
  borderRadius,
} from 'techpick-shared';

colorThemeContract.backgroundBase;
export const draggableItemStyle = style({
  minWidth: sizes['3xs'],
  minHeight: '32px',
  padding: space['8'],
  border: '1px solid',
  borderColor: colorThemeContract.borderNeutral,
  borderRadius: borderRadius['base'],
  backgroundColor: '#fff',
  cursor: 'grab',
  transition: 'background-color 0.2s',
  selectors: {
    '&:hover': {
      backgroundColor: colorThemeContract.primaryFaded,
    },
    '&:active': {
      cursor: 'grabbing',
    },
  },
});

export const draggingItem = style({
  opacity: 0.8,
});

export const selectedDragItemStyle = style({
  backgroundColor: colorThemeContract.primary,
});
