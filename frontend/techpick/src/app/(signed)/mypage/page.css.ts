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
