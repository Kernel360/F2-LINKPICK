import { style } from '@vanilla-extract/css';
import { sizes, typography, colorVars, space } from 'techpick-shared';
import { RECORD_HEIGHT } from '@/components/PickListViewer/pickRecordListLayout.css';

export const RecordContainerLayout = style({
  // -------------------------------
  height: RECORD_HEIGHT,
  padding: space['16'],
  borderBottom: `1px solid ${colorVars.color.border}`,
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: colorVars.primaryFaded,
    },
  },
  // -------------------------------
  display: 'flex',
  flexDirection: 'row',
  gap: space['16'],
});

export const recordImageSectionStyle = style({
  position: 'relative',
  width: sizes['8xs'],
});

export const defaultRecordImageSectionStyle = style({
  position: 'relative',
  width: sizes['8xs'],
});

export const recordImageStyle = style({
  objectFit: 'cover',
  borderRadius: '2px',
});

export const recordTitleAndBodySectionLayoutStyle = style({
  display: 'flex',
  flexDirection: 'column',
});

export const recordTitleSectionStyle = style({
  fontSize: typography.fontSize['2xl'],
  fontWeight: typography.fontWeights['light'],
  width: '264px',
  height: '96px',
  whiteSpace: 'normal',
  wordBreak: 'break-all',
  overflowY: 'scroll',
});

export const recordBodySectionStyle = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: space['8'],
});

export const recordSubTextStyle = style({
  fontSize: typography.fontSize['sm'],
  fontWeight: typography.fontWeights['normal'],
  color: colorVars.textSecondary,
});
