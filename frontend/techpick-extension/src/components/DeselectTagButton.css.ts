import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const DeselectTagButtonStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: colorVars.color.font,
});
