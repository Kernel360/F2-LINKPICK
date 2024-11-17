import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

const { color } = colorVars;

export const tagPickerLayout = style({
  position: 'relative',
});

export const tagDialogTriggerLayout = style({
  position: 'relative',
  boxSizing: 'border-box',
  cursor: 'pointer',
  width: '264px',
  minHeight: '30px',
  maxHeight: '60px',
  border: '1px solid transparent',
  borderRadius: '4px',
  backgroundColor: color.inputBackground,
  transition: 'border 0.3s ease',

  ':focus': {
    border: `1px solid ${color.inputBorderFocus}`,
    outline: 'none',
    backgroundColor: color.inputBackgroundFocus,
  },
});
