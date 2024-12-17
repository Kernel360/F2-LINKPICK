import { style } from '@vanilla-extract/css';
import { colorVars, fontWeights } from 'techpick-shared';

export const currentFolderNameSectionStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  flex: '0 0 100%',
  maxWidth: '100%',
  minWidth: 0, // 추가
});

export const folderOpenIconStyle = style({
  flexShrink: '0',
});

export const folderNameStyle = style({
  display: 'inline-block',
  fontWeight: fontWeights['medium'],
  height: '28px',
  lineHeight: '24px',
  fontSize: '24px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const folderSharedInfoTextStyle = style({
  flexShrink: '0',
  width: '80px',
  fontSize: '12px',
  fontWeight: '600',
  color: colorVars.primary,
});
