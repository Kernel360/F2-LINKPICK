import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const legacyFolderContentHeaderStyle = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1116px',
  padding: '24px 36px',
  width: '100%',
  justifyContent: 'space-between',
  transition: '0.3s ease',
});

export const folderContentHeaderStyle = style({
  width: '100%',
  overflow: 'hidden',
  borderBottom: '1px solid',
  backgroundColor: colorVars.gold2,
  borderColor: colorVars.gold6,
});
