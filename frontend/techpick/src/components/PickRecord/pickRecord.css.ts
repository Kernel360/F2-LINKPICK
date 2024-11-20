import { style } from '@vanilla-extract/css';
import { colorVars, typography } from 'techpick-shared';

export const pickRecordLayoutStyle = style({
  position: 'relative',
  display: 'flex',
  width: 'fit-content',
  minHeight: '60px',
  height: 'fit-content',
  alignItems: 'center',
});

export const pickImageStyle = style({
  position: 'relative',
  width: '48px',
  height: '48px',
  objectFit: 'cover',
  borderRadius: '2px',
});

export const pickEmptyImageStyle = style({
  border: '1px solid black',
});

export const pickTitleSectionStyle = style({
  fontSize: typography.fontSize['lg'],
  fontWeight: typography.fontWeights['light'],
  height: '32px',
  lineHeight: '32px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  cursor: 'pointer',
});

export const dateTextStyle = style({
  fontSize: typography.fontSize['sm'],
  fontWeight: typography.fontWeights['normal'],
  color: colorVars.gray11,
  whiteSpace: 'nowrap',
});
