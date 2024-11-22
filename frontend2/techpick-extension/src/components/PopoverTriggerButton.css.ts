import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const PopoverTriggerButtonStyle = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  border: '1px solid transparent',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: colorVars.color.font,

  ':hover': {
    backgroundColor: colorVars.color.popoverButtonHover,
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
});
