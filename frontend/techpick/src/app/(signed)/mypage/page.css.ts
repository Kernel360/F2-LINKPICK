import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { redOutlineButtonStyle } from '@/styles/redButtonStyle.css';

export const myPageLayoutStyle = style({
  width: '100%',
  height: '100vh',
  padding: '12px',
  backgroundColor: colorVars.gold2,
});

export const logoutButtonStyle = style([
  redOutlineButtonStyle,
  {
    width: '120px',
    height: '32px',
  },
]);

export const myPageContentContainerLayoutStyle = style({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
});

export const tutorialReplayCheckboxLayoutStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '16px 0',
});

export const buttonSectionStyle = style({
  display: 'flex',
  gap: '16px',
});

export const checkboxRootStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  borderRadius: '4px',
  backgroundColor: colorVars.orange1,
  boxShadow: `0 2px 10px ${colorVars.sand7}`,

  ':hover': {
    backgroundColor: colorVars.orange3,
  },

  ':focus': {
    boxShadow: '0 0 0 2px black',
  },
});

export const checkboxIndicatorStyle = style({
  color: colorVars.orange11,
});

export const tutorialReplayCheckboxLabelStyle = style({
  fontSize: '12px',
  cursor: 'pointer',
  flexShrink: 0,
});
