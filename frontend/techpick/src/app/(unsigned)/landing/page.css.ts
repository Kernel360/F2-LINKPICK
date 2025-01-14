import { style } from '@vanilla-extract/css';
import { colorVars, desktop, fontSize, fontWeights } from 'techpick-shared';
import {
  orangeSolidButtonStyle,
  orangeOutlineButtonStyle,
} from '@/styles/orangeButtonStyle.css';

export const landingPageStyle = style({
  position: 'relative',
  backgroundColor: colorVars.gold1,
});

export const headerStyle = style({
  position: 'sticky',
  top: '0',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  borderBottom: '1px solid',
  borderColor: colorVars.sand6,
  backgroundColor: colorVars.gold1,
  zIndex: 1,
});

export const navStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1280px',
  height: '64px',
  padding: '0px 12px',
});

export const navUlStyle = style({
  display: 'flex',
  gap: '12px',
});

export const landingPageButtonStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80px',
  height: '32px',
  padding: '0 8px',
});

export const loginLinkStyle = style([
  orangeOutlineButtonStyle,
  landingPageButtonStyle,
]);

export const signUpButtonStyle = style([
  orangeSolidButtonStyle,
  landingPageButtonStyle,
]);

export const mainSectionStyle = style({
  margin: '0 auto',
  maxWidth: '1280px',
  padding: '0 12px 0 12px',
});

export const titleStyle = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 0',
  fontSize: fontSize['2xl'],
  fontWeight: fontWeights.semibold,

  '@media': {
    [desktop]: {
      alignItems: 'center',
      padding: '52px 0',
      fontSize: '56px',
    },
  },
});

export const sectionStyle = style({
  position: 'relative',
  width: '100%',
  height: '100vh',
  border: '1px solid black',
});
