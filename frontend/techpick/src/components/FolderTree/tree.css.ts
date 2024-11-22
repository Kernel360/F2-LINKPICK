import { style } from '@vanilla-extract/css';
import { colorVars, sizes } from 'techpick-shared';

export const horizontalResizingContainerLayout = style({
  transition: 'width 0.2s', // Resizing에 애니메이션 적용
});

export const resizeHandleStyle = style({
  backgroundColor: colorVars.backgroundNeutral,
  outline: '16px solid transparent',
  height: '100%',
  transition: 'all 0.2s', // Resizing에 애니메이션 적용
  selectors: {
    '&:hover, &:active': {
      boxShadow: `4px 0 8px -2px ${'#cbcbcb'}`,
    },
  },
});

export const treeLayout = style({
  height: '100vh',
  padding: '12px 0 12px 12px',
  overflowY: 'scroll',
  backgroundColor: colorVars.backgroundNeutral,
  // backgroundColor: colorVars.secondary,
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
