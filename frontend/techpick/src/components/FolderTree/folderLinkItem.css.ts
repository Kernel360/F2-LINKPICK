import { style } from '@vanilla-extract/css';
import { borderRadius, colorVars, sizes, space } from 'techpick-shared';

export const folderInfoItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['8'],
  minWidth: sizes['6xs'],
  minHeight: '32px',
  padding: space['8'],
  borderRadius: borderRadius['base'],
  backgroundColor: colorVars.backgroundNeutral,
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

export const selectedDragItemStyle = style({
  backgroundColor: colorVars.primary,
});

export const dragOverItemStyle = style({
  backgroundColor: colorVars.primaryFaded,
});

export const FolderIconStyle = style({
  flexShrink: 0,
});
