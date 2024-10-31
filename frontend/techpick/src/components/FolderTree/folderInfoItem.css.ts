import { style } from '@vanilla-extract/css';
import {
  colorThemeContract,
  sizes,
  space,
  borderRadius,
} from 'techpick-shared';

export const folderInfoItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['8'],
  minWidth: sizes['3xs'],
  minHeight: '32px',
  padding: space['8'],
  borderRadius: borderRadius['base'],
  backgroundColor: colorThemeContract.backgroundBase,
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

export const FolderIconStyle = style({
  flexShrink: 0,
});
