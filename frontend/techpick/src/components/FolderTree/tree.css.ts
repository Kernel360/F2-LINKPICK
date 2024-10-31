import { style } from '@vanilla-extract/css';
import { colorThemeContract, space } from 'techpick-shared';

export const treeLayout = style({
  minWidth: '400px',
  height: '100vh',
  padding: space['8'],
  margin: 'auto',
});

export const dragOverStyle = style({
  minWidth: '200px',
  minHeight: '30px',
  padding: '8px 12px',
  margin: '4px 0',
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
