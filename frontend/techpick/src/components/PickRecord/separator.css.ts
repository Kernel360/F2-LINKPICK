import { style } from '@vanilla-extract/css';

export const separatorStyle = style({
  minHeight: '1px',
  height: '100%',
  width: '1px',
  backgroundColor: 'black',
  flexShrink: 0,
  flexGrow: 0,
});
