import { style } from '@vanilla-extract/css';

export const separatorStyle = style({
  minHeight: '1px',
  maxHeight: '100%',
  width: '1px',
  backgroundColor: 'black',
  flexShrink: 0,
  flexGrow: 0,
  alignSelf: 'stretch',
});
