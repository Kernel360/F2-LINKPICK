import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const buttonStyle = style({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colorVars.gray11,
  padding: '4px',
  width: '30px',
  height: '30px',
  transition: '0.3s ease',
  ':hover': {
    color: colorVars.primary,
    backgroundColor: colorVars.gold4,
    borderRadius: '4px',
  },
});
