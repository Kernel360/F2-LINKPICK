import { style } from '@vanilla-extract/css';
import { colorVars, sizes, space, fontSize } from 'techpick-shared';

export const folderItemOverlay = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['8'],
  minWidth: sizes['6xs'],
  minHeight: '40px',
  padding: '8px 12px',
  borderRadius: '4px',
  backgroundColor: colorVars.gold4,
  fontSize: fontSize['lg'],
  color: colorVars.point,
});

export const FolderIconStyle = style({
  width: '20px',
  flexShrink: 0,
});

export const folderTextStyle = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  height: '24px',
});
