import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { greenOutlineButtonStyle } from '@/styles/greenButtonStyle.css';

export const popoverTriggerStyle = style({
  display: 'flex',
  flexShrink: 0,
  gap: '4px',
  alignItems: 'center',
  width: '100px',
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

export const createPickButtonStyle = style([
  greenOutlineButtonStyle,
  {
    marginTop: '8px',
    width: '100%',
    height: '20px',
    fontSize: '12px',
  },
]);

export const wrongDescriptionTextStyle = style({
  display: 'inline-block',
  paddingLeft: '4px',
  fontSize: '12px',
  fontWeight: '400',
  color: colorVars.red11,
});
