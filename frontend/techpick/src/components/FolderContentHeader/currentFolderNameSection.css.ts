import { orangeGhostButtonStyle } from '@/styles/orangeButtonStyle.css';
import { style } from '@vanilla-extract/css';
import { fontWeights } from 'techpick-shared';

export const currentFolderNameSectionStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  flex: '1 0',
  maxWidth: '100%',
  minWidth: 0,
});

export const folderOpenIconStyle = style({
  flexShrink: '0',
});

export const folderNameStyle = style({
  flexShrink: 1,
  flexGrow: 0,
  display: 'inline-block',
  fontWeight: fontWeights.medium,
  height: '28px',
  lineHeight: '24px',
  fontSize: '24px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const folderSharedInfoLinkStyle = style([
  {
    display: 'flex',
    justifyContent: 'center',
    flexShrink: '0',
    width: '60px',
    fontSize: '12px',
  },
  orangeGhostButtonStyle,
]);
