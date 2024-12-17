import { style } from '@vanilla-extract/css';
import { colorVars, fontSize, sizes, space } from 'techpick-shared';

export const topBorderColor = style({
  borderTop: '2px solid',
  borderColor: colorVars.gold4,
});

export const navItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['8'],
  minWidth: sizes['6xs'],
  height: '36px',
  borderRadius: '4px',
  padding: '8px 12px',
  paddingTop: '12px',
  fontSize: fontSize['sm'],
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  selectors: {
    '&:hover': {
      backgroundColor: colorVars.gold4,
    },
  },
});
