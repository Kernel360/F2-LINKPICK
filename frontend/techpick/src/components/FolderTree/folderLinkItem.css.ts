import { style } from '@vanilla-extract/css';
import { colorVars, sizes, space, typography } from 'techpick-shared';

export const folderInfoItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['8'],
  minWidth: sizes['6xs'],
  height: '36px',
  padding: '8px 12px',
  borderRadius: '4px',
  fontSize: typography.fontSize['sm'],

  cursor: 'grab',
  transition: 'background-color 0.2s',
  selectors: {
    '&:hover': {
      backgroundColor: colorVars.gold4,
    },
    '&:active': {
      cursor: 'grabbing',
      color: colorVars.primary,
      backgroundColor: colorVars.gold4,
    },
  },
});

export const selectedDragItemStyle = style({
  backgroundColor: colorVars.gold4,
  color: colorVars.primary,
});

export const dragOverItemStyle = style({
  backgroundColor: colorVars.neutral,
});

export const FolderIconStyle = style({
  width: '16px',
  flexShrink: 0,
});

export const folderTextStyle = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  height: '100%',
});
