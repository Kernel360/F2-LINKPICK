import { style } from '@vanilla-extract/css';
import { colorVars, fontSize, sizes, space } from 'techpick-shared';

export const searchItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: space['8'],
  minWidth: sizes['6xs'],
  height: '36px',
  margin: '0 8px',
  marginBottom: '12px',
  padding: '8px 12px',
  borderRadius: '4px',
  backgroundColor: colorVars.sand5,
  fontSize: fontSize['sm'],
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  selectors: {
    '&:hover': {
      backgroundColor: colorVars.sand6,
    },
  },
});

export const searchButtonStyle = style({
  height: '24px',
  ':hover': {
    cursor: 'pointer',
  },
});

export const borderStyle = style({
  border: '1px solid',
});
