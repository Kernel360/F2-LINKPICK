import { style } from '@vanilla-extract/css';
import { redOutlineButtonStyle } from '@/styles/redButtonStyle.css';

export const deleteTagDialogButtonStyle = style([
  redOutlineButtonStyle,
  {
    fontSize: '14px',
  },
]);
