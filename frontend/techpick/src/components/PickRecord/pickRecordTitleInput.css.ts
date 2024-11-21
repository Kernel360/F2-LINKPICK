import { style } from '@vanilla-extract/css';
import { typography } from 'techpick-shared';

export const pickTitleInputStyle = style({
  fontSize: typography.fontSize['lg'],
  fontWeight: typography.fontWeights['light'],
  height: '32px',
  margin: 0,
  width: '100%',
});
