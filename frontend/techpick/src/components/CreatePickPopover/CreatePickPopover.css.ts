import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const popoverContentStyle = style({
  border: '1px solid black',
  borderRadius: '4px',
  padding: '16px 16px 20px 16px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  gap: '16px',
});

export const urlSubmitFormStyle = style({
  width: '500px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

export const urlInputStyle = style({
  padding: '12px 12px',
  borderRadius: '4px',
  margin: 0,
  width: '100%',
  border: '1px solid transparent',
  backgroundColor: colorVars.gold3,
  fontSize: '1rem',
  color: colorVars.secondary,

  ':focus': {
    border: `1px solid ${colorVars.color.inputBorderFocus}`,
    outline: 'none',
    backgroundColor: colorVars.gold3,
    transition: 'border 0.3s ease',
    boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2)',
  },
});
