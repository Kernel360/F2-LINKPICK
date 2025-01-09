import { style } from '@vanilla-extract/css';
import { colorVars, fontSize, sizes, space } from 'techpick-shared';

export const folderInputLayout = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['8'],
  minWidth: sizes['6xs'],
  maxWidth: sizes['full'],
  padding: space['8'],
  paddingLeft: '12px',
});

export const labelStyle = style({
  color: colorVars.primary,
  flexShrink: '0',
  flexGrow: '0',
});

export const inputStyle = style({
  flexGrow: '1',
  outline: 'none',
  border: 'none',
  borderBottom: '1px solid',
  borderColor: colorVars.primary,
  padding: '0',
  fontSize: fontSize['sm'],
  width: '0px',
});
