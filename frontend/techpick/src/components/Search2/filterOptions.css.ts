import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const filterOptionContainer = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  alignItems: 'center',
});

export const icon = style({
  display: 'flex',
  color: colorVars.gray8,
});
