import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const activeDraggingFolderStyle = style({
  border: '2px solid',
  borderColor: colorVars.primary,
});
