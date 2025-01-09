import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const deleteTagDialogButtonStyle = style({
  border: '1px solid',
  borderColor: colorVars.red8,
  borderRadius: '4px',
  padding: '2px 0',
  transition: 'background-color 0.3s ease',
  color: colorVars.red11,
  cursor: 'pointer',
  fontSize: '14px',

  ':hover': {
    backgroundColor: colorVars.red3,
  },

  ':focus': {
    backgroundColor: colorVars.red3,
    outline: 'none',
  },
});
