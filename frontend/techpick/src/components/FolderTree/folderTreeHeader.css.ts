import { style } from '@vanilla-extract/css';
import { colorVars, sizes, space, typography } from 'techpick-shared';

export const folderTreeHeaderLayout = style({
  position: 'sticky',
  top: 0,
  minWidth: sizes['6xs'],
  backgroundColor: colorVars.backgroundNeutral,
});

export const dividerStyle = style({
  margin: `${space['12']} 0`,
});

export const folderTreeHeaderTitleLayout = style({
  fontWeight: typography.fontWeights['semibold'],
  color: colorVars.gray9,
  fontSize: '20px',
  margin: '24px 0 12px 12px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
