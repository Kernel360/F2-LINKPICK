import { style } from '@vanilla-extract/css';
import { space } from 'techpick-shared';

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
  display: 'flex',
  flexDirection: 'column',
  gap: space['12'],
});
