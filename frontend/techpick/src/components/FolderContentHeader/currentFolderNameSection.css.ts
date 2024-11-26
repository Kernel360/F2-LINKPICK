import { style } from '@vanilla-extract/css';
import { fontWeights, fontSize } from 'techpick-shared';

export const currentFolderNameSectionStyle = style({
  display: 'flex',
  alignItems: 'end',
  gap: 8,
});

export const folderNameStyle = style({
  display: 'inline',
  fontWeight: fontWeights['medium'],
  fontSize: fontSize['3xl'],
});
