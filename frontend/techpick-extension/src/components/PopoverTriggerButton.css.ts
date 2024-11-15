import { style } from '@vanilla-extract/css';
import { color } from 'techpick-shared';

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
  color: color.font,

  ':hover': {
    backgroundColor: color.popoverButtonHover,
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
});
