import { style } from '@vanilla-extract/css';
import { colorVars, typography } from 'techpick-shared';

export const pickRecordLayoutStyle = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '1044px',
  minHeight: '60px',
  height: 'fit-content',
  borderTop: '0.5px solid',
  borderBottom: '0.5px solid',
  borderColor: colorVars.gold7,
  background: colorVars.gold3,
});

export const pickImageStyle = style({
  position: 'relative',
  width: '96px',
  aspectRatio: '1280 / 630',
  // objectFit: 'cover',
  borderRadius: '2px',
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

export const linkLayoutStyle = style({
  position: 'absolute',
  width: '104px',
  height: '60px',
  backgroundColor: colorVars.gold12,
  opacity: '0.7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export const externalLinkIconStyle = style({
  width: '28px',
  height: '28px',
  cursor: 'pointer',
  color: colorVars.white,
});
