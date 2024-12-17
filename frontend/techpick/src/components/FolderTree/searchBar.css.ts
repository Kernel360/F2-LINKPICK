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
  border: '1px solid',
  borderColor: colorVars.gold6,
  borderRadius: '4px',
  padding: '8px 12px',
  fontSize: fontSize['sm'],
  color: colorVars.sand11,
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  selectors: {
    '&:hover': {
      backgroundColor: colorVars.gold4,
    },
  },
});

export const searchBarDescriptionStyle = style({
  fontSize: '12px',
});
