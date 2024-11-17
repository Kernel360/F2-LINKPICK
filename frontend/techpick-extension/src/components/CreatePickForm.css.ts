import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const pickFormLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});

export const formFieldLayout = style({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  width: '100%',
});

export const titleInputStyle = style({
  width: '100%',
  height: '40px',
  border: '1px solid transparent',
  borderRadius: '4px',
  padding: '8px',
  backgroundColor: colorVars.color.inputBackground,
  fontSize: '1rem',
  color: colorVars.color.font,

  ':focus': {
    border: `1px solid ${colorVars.color.inputBorderFocus}`,
    outline: 'none',
    backgroundColor: colorVars.color.inputBackground,
    transition: 'border 0.3s ease',
  },
});

export const textAreaStyle = style({
  width: '264px',
  height: '72px',
  padding: '8px',
  fontSize: '1rem',
  border: '1px solid transparent',
  borderRadius: '4px',
  backgroundColor: colorVars.color.inputBackground,
  resize: 'none',
  color: colorVars.color.font,

  ':focus': {
    border: `1px solid ${colorVars.color.inputBorderFocus}`,
    outline: 'none',
    backgroundColor: colorVars.color.inputBackground,
    transition: 'border 0.3s ease',
  },
});

export const submitButtonLayout = style({
  marginLeft: 'auto',
});

export const labelLayout = style({
  width: '48px',
});
