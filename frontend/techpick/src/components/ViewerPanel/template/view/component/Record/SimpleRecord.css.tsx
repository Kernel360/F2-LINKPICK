import { style } from '@vanilla-extract/css';
import { color } from 'techpick-shared';

export const recordLayout = style({
  border: `1px solid ${color.border}`,
  borderRadius: '4px',
  backgroundColor: color.background,
  height: '40px',
  margin: '10px',
});
