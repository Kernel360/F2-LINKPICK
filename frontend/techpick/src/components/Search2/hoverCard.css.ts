import { style } from '@vanilla-extract/css';
import { colorVars, space, typography } from 'techpick-shared';

export const hoverCardContainer = style({
  display: 'none',
  flexDirection: 'column',
  paddingLeft: '16px',
  borderLeft: `1px solid ${colorVars.gray4}`,
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'flex',
    },
  },
});
export const hoverCardBorderLine = style({
  margin: 'auto',
});

export const hoverCardImageContainer = style({
  padding: '16px 0px',
});

export const hoverCardTitle = style({
  display: 'inline-block',
  width: '200px',
  color: colorVars.gold10,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeights.bold,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const hoverDataCardContainer = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  flexDirection: 'row',
  margin: 'auto',
});
export const hoverCardDate = style({
  marginTop: space['4'],
  color: colorVars.gray10,
  fontSize: typography.fontSize.sm,
});

export const hoverCardImage = style({
  objectFit: 'contain',
  borderRadius: '8px',
  backgroundColor: colorVars.gold2,
});
