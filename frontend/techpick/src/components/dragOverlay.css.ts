import { style } from '@vanilla-extract/css';
import { colorThemeContract } from 'techpick-shared';

export const pickDragOverlayStyle = style({
  width: '200px',
  minHeight: '30px',
  padding: '8px 12px',
  margin: '4px 0',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#fff',
  cursor: 'grab',
  transition: 'background-color 0.2s',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  selectors: {
    '&:hover': {
      backgroundColor: colorThemeContract.primaryFaded,
    },
    '&:active': {
      cursor: 'grabbing',
    },
  },
});

export const scaledDownStyle = style({
  transform: 'scale(0.8)',
});
