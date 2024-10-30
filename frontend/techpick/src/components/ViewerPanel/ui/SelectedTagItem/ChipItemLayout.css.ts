import { style } from '@vanilla-extract/css';
import { ChipCommonStyle } from './ChipItemCommonStyle';

export const chipItemStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  maxWidth: `calc(${ChipCommonStyle.width})`,
  height: '20px',
  borderRadius: '4px',
});
