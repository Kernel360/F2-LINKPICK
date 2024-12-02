import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const activeDraggingFolderStyle = style({
  border: '1px solid',
  borderColor: colorVars.primary,
});
