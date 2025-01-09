import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

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
  width: '288px',
  border: '1px solid transparent',
  transition: 'border 0.3s ease',
});
