import { style } from '@vanilla-extract/css';
import { colorThemeContract, fontSize, sizes, space } from 'techpick-shared';

export const folderInputLayout = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['8'],
  minWidth: sizes['6xs'],
  maxWidth: sizes['full'],
  padding: space['8'],
});

export const labelStyle = style({
  color: colorThemeContract.textPrimary,
});

export const inputStyle = style({
  flexGrow: '1',
  outline: 'none',
  border: 'none',
  borderBottom: '1px solid',
  borderColor: colorThemeContract.primary,
  padding: '0',
  fontSize: fontSize['md'],
});
