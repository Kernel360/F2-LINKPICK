import { style } from '@vanilla-extract/css';
import { colorVars, typography } from 'techpick-shared';

export const pickRecordLayoutStyle = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  minHeight: '60px',
  height: 'fit-content',
  borderBottom: '1px solid black',
});

export const pickImageStyle = style({
  position: 'relative',
  width: '96px',
  aspectRatio: '1280 / 630',
  // objectFit: 'cover',
  borderRadius: '2px',
});

export const pickEmptyImageStyle = style({
  border: '1px solid black',
});

export const pickTitleSectionStyle = style({
  fontSize: typography.fontSize['lg'],
  fontWeight: typography.fontWeights['light'],
  height: '40px',
  lineHeight: '20px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  cursor: 'pointer',
  wordBreak: 'break-all',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

export const dateTextStyle = style({
  fontSize: typography.fontSize['sm'],
  fontWeight: typography.fontWeights['normal'],
  color: colorVars.gray11,
  whiteSpace: 'nowrap',
});

export const externalLinkIconStyle = style({
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '30px',
  height: '30px',
  cursor: 'pointer',
});
