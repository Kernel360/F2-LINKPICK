import { style } from '@vanilla-extract/css';
import {
  borderRadius,
  colorThemeContract,
  sizes,
  space,
} from 'techpick-shared';

export const folderInfoItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['8'],
  minWidth: sizes['6xs'],
  minHeight: '32px',
  padding: space['8'],
  borderRadius: borderRadius['base'],
  backgroundColor: colorThemeContract.backgroundNeutral,
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

export const selectedDragItemStyle = style({
  backgroundColor: colorThemeContract.primary,
});

export const FolderIconStyle = style({
  flexShrink: 0,
});
