import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const searchBarStyle = style({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '4px',
  marginBottom: '8px',
  borderBottom: `1px solid ${colorVars.gray4}`,
});

export const iconButtonContainerStyle = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colorVars.gray8,
  ':hover': {
    backgroundColor: colorVars.gray2,
  },
});

export const searchInputStyle = style({
  flexGrow: 1,
  padding: '8px',
  fontSize: '16px',
});
