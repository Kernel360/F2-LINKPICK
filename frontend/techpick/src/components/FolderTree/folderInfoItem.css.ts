import { style } from '@vanilla-extract/css';
import { colorThemeContract } from 'techpick-shared';

export const draggableItemStyle = style({
  minWidth: '200px',
  minHeight: '30px',
  padding: '8px 12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
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
