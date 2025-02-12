import { style } from '@vanilla-extract/css';
import { typography } from 'techpick-shared';
import { colorVars } from 'techpick-shared';

export const sideNavigationBarLayoutStyle = style({
  height: '100dvh',
  padding: '4px',
  paddingTop: '16px',
  backgroundColor: colorVars.gold3,
  borderRight: `2px solid ${colorVars.gold4}`,
  ':hover': {
    borderRight: `2px solid ${colorVars.gold5}`,
  },
});

export const sideNavigationTitleLayoutStyle = style({
  fontWeight: typography.fontWeights.semibold,
  color: colorVars.gray9,
  margin: '12px 8px 12px 12px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '30px',
});

export const editableFolderNavigationItemListStyle = style({
  overflowY: 'scroll',
  height: 'calc(100dvh - 330px)',

  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const emptySpaceStyle = style({
  width: '100%',
  height: '36px',
});

export const topBorderColor = style({
  borderTop: '2px solid',
  borderColor: colorVars.gold4,
});

export const showCreateRootChildFolderInputButtonStyle = style({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colorVars.gray11,
  padding: '4px',
  width: '30px',
  height: '30px',
  transition: '0.3s ease',
  ':hover': {
    color: colorVars.primary,
    backgroundColor: colorVars.gold4,
    borderRadius: '4px',
  },
});
