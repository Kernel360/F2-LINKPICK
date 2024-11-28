import { style } from '@vanilla-extract/css';
import { typography, colorVars, zIndex } from 'techpick-shared';

export const pickRecordTitleInputLayoutStyle = style({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: zIndex.level2,
  boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2)',
  backgroundColor: colorVars.background,
  width: '528px',
  minHeight: '40px',
});

export const pickTitleInputStyle = style({
  margin: 0,
  width: '100%',
  minHeight: '40px',
  height: 'fit-content',
  resize: 'none',
  fontSize: typography.fontSize['md'],
  fontWeight: typography.fontWeights['light'],
  fontFamily: 'inherit',
});
