import { style } from '@vanilla-extract/css';
import { colorThemeContract } from 'techpick-shared';

export const treeLayout = style({
  width: '400px',
  height: '800px',
  backgroundColor: 'green',
  padding: '10px',
  paddingTop: '50px',
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
