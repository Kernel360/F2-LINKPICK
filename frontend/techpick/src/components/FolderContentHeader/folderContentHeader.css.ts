import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const folderContentHeaderLayoutStyle = style({
  width: '100%',
  overflow: 'hidden',
  borderBottom: '1px solid',
  backgroundColor: colorVars.gold2,
  borderColor: colorVars.gold6,
});

export const createPickPopoverButtonLayoutStyle = style({
  marginRight: '24px',
  display: 'flex',
  alignItems: 'center',
});

export const folderContentHeaderStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 12px',
});

export const folderDescriptionStyle = style({
  minWidth: '0',
});

export const currentPathIndicatorLayoutStyle = style({
  padding: '2px 0',
});
