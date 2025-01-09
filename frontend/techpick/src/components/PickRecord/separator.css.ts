import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const separatorStyle = style({
  minHeight: '1px',
  maxHeight: '100%',
  width: '1px',
  backgroundColor: colorVars.gold7,
  flexShrink: 0,
  flexGrow: 0,
  alignSelf: 'stretch',
});
