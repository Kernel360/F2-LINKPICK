import { style } from '@vanilla-extract/css';
import { typography } from 'techpick-shared';

export const pickTitleInputStyle = style({
  margin: 0,
  width: '100%',
  minHeight: '40px',
  height: 'fit-content',
  resize: 'none',
  fontSize: typography.fontSize['md'],
  fontWeight: typography.fontWeights['light'],
  fontFamily: 'inherit',
  boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2)',
});
