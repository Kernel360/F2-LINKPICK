import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const myPageLayoutStyle = style({
  width: '100%',
  height: '100vh',
  padding: '12px',
  backgroundColor: colorVars.gold2,
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

  ':focus': {
    backgroundColor: colorVars.red3,
  },
});

export const myPageContentContainerLayoutStyle = style({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
});

export const tutorialReplaySwitchLayoutStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '16px 0',
});

export const tutorialReplaySwitchLabelStyle = style({
  fontSize: '12px',
  cursor: 'pointer',
  flexShrink: 0,
});

export const buttonSectionStyle = style({
  display: 'flex',
  gap: '16px',
});
