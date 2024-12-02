import { style } from '@vanilla-extract/css';
import { colorVars, sizes, space, typography } from 'techpick-shared';

export const folderTreeHeaderLayout = style({
  position: 'sticky',
  top: 0,
  minWidth: sizes['6xs'],
  backgroundColor: colorVars.sand2,
});

export const dividerStyle = style({
  margin: `${space['12']} 0`,
});

export const folderTreeHeaderTitleLayout = style({
  fontWeight: typography.fontWeights['semibold'],
  color: colorVars.gray9,
  margin: '12px 8px 12px 12px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
