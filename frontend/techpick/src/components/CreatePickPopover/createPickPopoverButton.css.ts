import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const popoverTriggerStyle = style({
  display: 'flex',
  flexShrink: 0,
  gap: '4px',
  alignItems: 'center',
  fontSize: '12px',
  cursor: 'pointer',
});

export const popoverContentStyle = style({
  width: '240px',
  height: '100px',
  border: '1px solid',
  borderColor: colorVars.gold6,
  borderRadius: '4px',
  padding: '8px',
  paddingTop: '4px',
  backgroundColor: colorVars.gold3,
});

export const inputLabelStyle = style({
  fontSize: '12px',
  fontWeight: '500',
  color: colorVars.sand11,
});

export const urlInputStyle = style({
  width: '100%',
  margin: 0,
  border: '1px solid',
  borderColor: colorVars.gold6,
  borderRadius: '4px',
  backgroundColor: colorVars.gold3,
  fontSize: '12px',
  color: colorVars.secondary,

  ':focus': {
    border: `1px solid ${colorVars.gold7}`,
    outline: 'none',
    backgroundColor: colorVars.gold4,
    transition: 'border 0.3s ease, background-color 0.3s ease',
  },
});

export const createPickButtonStyle = style({
  marginTop: '8px',
  width: '100%',
  height: '20px',
  border: '1px solid',
  borderColor: colorVars.green8,
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
  color: colorVars.green11,
  cursor: 'pointer',
  fontSize: '12px',

  selectors: {
    '&:hover, &:focus': {
      backgroundColor: colorVars.green3,
    },
  },
});

export const wrongDescriptionTextStyle = style({
  fontSize: '12px',
  color: colorVars.red11,
});
