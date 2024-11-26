// dragOverlay.css.ts
import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

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
      backgroundColor: colorVars.primaryFaded,
    },
    '&:active': {
      cursor: 'grabbing',
    },
  },
});

export const scaledDownStyle = style({
  transform: 'scale(0.8)',
});

export const stackedOverlay = style({
  position: 'relative',
});

export const dragCount = style({
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  background: '#4a90e2',
  color: 'white',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '12px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  zIndex: 1,
});
