import { style } from '@vanilla-extract/css';
import { sizes, typography, colorVars, space } from 'techpick-shared';

export const pickListItemLayoutStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: space['16'],
  height: '100px',
  padding: space['16'],
  borderTop: `1px solid ${colorVars.gray6}`,
  cursor: 'pointer',
});

export const pickImageSectionLayoutStyle = style({
  position: 'relative',
  width: sizes['8xs'],
});

export const pickImageStyle = style({
  objectFit: 'cover',
  borderRadius: '2px',
});

export const pickEmptyImageStyle = style({
  border: '1px solid black',
});

export const pickContentSectionLayoutStyle = style({
  display: 'flex',
  flexDirection: 'column',
});

export const pickTitleSectionStyle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeights['light'],
  width: '264px',
  height: '96px',
  whiteSpace: 'normal',
  wordBreak: 'break-all',
  overflowY: 'scroll',
});

export const pickDetailInfoLayoutStyle = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: space['8'],
});

export const dividerDot = style({
  fontSize: typography.fontSize['sm'],
  fontWeight: typography.fontWeights['normal'],
  color: colorVars.gray11,
});

export const dateTextStyle = style({
  fontSize: typography.fontSize['sm'],
  fontWeight: typography.fontWeights['normal'],
  color: colorVars.gray11,
});
