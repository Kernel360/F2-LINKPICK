import { style } from '@vanilla-extract/css';
import { colorVars, sizes, space } from 'techpick-shared';

export const treeLayout = style({
  minWidth: sizes['6xs'],
  height: '100vh',
  padding: space['8'],
  overflowY: 'scroll',
  backgroundColor: colorVars.backgroundNeutral,

  '@media': {
    'screen and (min-width: 1440px)': {
      minWidth: sizes['3xs'],
    },
  },
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
      backgroundColor: colorVars.primaryFaded,
    },
    '&:active': {
      cursor: 'grabbing',
    },
  },
});
