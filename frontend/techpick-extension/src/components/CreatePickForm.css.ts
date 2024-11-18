import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const pickFormLayout = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const pickFormFieldListLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '16px 24px 0px 24px',
  height: '244px',
});

export const formFieldLayout = style({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  width: '100%',
});

export const titleInputStyle = style({
  width: '224px',
  height: '48px',
  border: '1px solid transparent',
  padding: '8px',
  backgroundColor: colorVars.lightGray,
  fontSize: '1rem',
  color: colorVars.color.font,

  ':focus': {
    border: `1px solid ${colorVars.color.inputBorderFocus}`,
    outline: 'none',
    backgroundColor: colorVars.lightGray,
    transition: 'border 0.3s ease',
  },
});

export const submitButtonLayout = style({
  width: '110px',
  height: '272px',
  backgroundColor: 'red',
});

export const submitButtonStyle = style({
  width: '96px',
  height: 'auto',
  backgroundColor: colorVars.point,
  cursor: 'pointer',
});

export const labelLayout = style({
  width: '100%',
});

export const plusIconStyle = style({
  color: 'white',
});

export const footerStyle = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  marginTop: '8px',
  paddingTop: '12px',
  width: '288px',
  borderTop: '1px solid',
  borderColor: colorVars.gray5,
  textAlign: 'end',
});

export const footerTextStyle = style({
  paddingRight: '4px',
  color: colorVars.gray9,
  fontSize: '12px',
  fontWeight: '600',

  ':hover': {
    transition: 'color 0.3s ease',
    color: colorVars.point,
  },
});
