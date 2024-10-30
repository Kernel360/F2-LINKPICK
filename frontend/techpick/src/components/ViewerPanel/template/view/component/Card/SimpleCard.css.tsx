import { style } from '@vanilla-extract/css';
import { colorThemeContract } from 'techpick-shared';

const { color } = colorThemeContract;

export const cardLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '280px',
  height: '320px',
  border: `1px solid ${color.border}`,
  borderRadius: '4px',
  backgroundColor: color.background,
});
