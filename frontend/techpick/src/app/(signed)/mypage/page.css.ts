import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const myPageLayoutStyle = style({
  width: '100%',
  height: '100vh',
  padding: '12px',
  backgroundColor: colorVars.gold2,
});

export const buttonSectionLayout = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '8px',
});

export const logoutButtonStyle = style({
  width: '120px',
  height: '32px',
  border: '1px solid',
  borderColor: colorVars.red8,
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  color: colorVars.red11,
  cursor: 'pointer',

  ':hover': {
    backgroundColor: colorVars.red3,
  },
});
