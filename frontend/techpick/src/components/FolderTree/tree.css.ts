import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const horizontalResizingContainerLayout = style({
  backgroundColor: colorVars.sand2,
});

export const resizeHandleStyle = style({
  backgroundColor: colorVars.backgroundNeutral,
  outline: '16px solid transparent',
  height: '100%',
  transition: 'all 0.2s', // Resizing에 애니메이션 적용
});

export const treeLayout = style({
  height: '100vh',
  padding: '4px',
  paddingTop: '16px',
  backgroundColor: colorVars.gold3,
  borderRight: `2px solid ${colorVars.gold4}`,
  ':hover': {
    borderRight: `2px solid ${colorVars.gold5}`,
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

export const treeNodeLayoutStyle = style({
  overflowY: 'scroll',
  height: 'calc(100vh - 330px)',
});

export const emptySpaceStyle = style({
  width: '100%',
  height: '36px',
});
