import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { SelectedTagCommonStyle } from './SelectedTagCommonStyle.css';

const { color } = colorVars;

export const tagPickerLayout = style({
  position: 'relative',
});

export const tagPickerPlaceholderStyle = style({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '30px',
  paddingLeft: '8px',
  lineHeight: '30px',
  fontSize: '14px',
  color: colorVars.gray11,
});

export const tagDialogTriggerLayout = style({
  position: 'relative',
  boxSizing: 'border-box',
  cursor: 'pointer',
  width: SelectedTagCommonStyle.width,

  minHeight: '30px',
  maxHeight: '60px',
  border: '1px solid transparent',
  backgroundColor: colorVars.lightGray,
  transition: 'border 0.3s ease',

  ':focus': {
    border: `1px solid ${color.inputBorderFocus}`,
    outline: 'none',
    backgroundColor: colorVars.lightGray,
    boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2)',
  },
});
