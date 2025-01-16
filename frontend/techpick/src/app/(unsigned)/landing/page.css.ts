import { style } from '@vanilla-extract/css';
import {
  colorVars,
  desktop,
  tablet,
  fontSize,
  fontWeights,
} from 'techpick-shared';
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
  height: '64px',
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
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 0',
  fontSize: fontSize['2xl'],
  fontWeight: fontWeights.semibold,

  '@media': {
    [tablet]: {
      padding: '32px 0',
    },
    [desktop]: {
      alignItems: 'center',
      padding: '52px 0',
      fontSize: '56px',
    },
  },
});

export const sectionStyle = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minHeight: 'fit-content',
  marginBottom: '20px',

  '@media': {
    [tablet]: {
      height: '50vh',
      marginBottom: '28px',
    },

    [desktop]: {
      justifyContent: 'center',
      height: '50vh',
      marginBottom: '60px',
    },
  },
});

export const sectionContentStyle = style({
  '@media': {
    [desktop]: {
      display: 'flex',
      justifyContent: 'center',
      gap: '60px',
    },
  },
});

export const extensionSectionStyle = style({
  flexDirection: 'column',
  alignItems: 'center',
});

export const shareBookmarkSectionStyle = style({
  '@media': {
    [desktop]: {
      flexDirection: 'row-reverse',
    },
  },
});

export const sectionTextAreaStyle = style({
  marginBottom: '16px',

  '@media': {
    [desktop]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: '0px',
      minWidth: '440px',
    },
  },
});

export const extensionTextAreaStyle = style({
  '@media': {
    [desktop]: {
      textAlign: 'center',
    },
  },
});

export const sectionTitleStyle = style({
  fontSize: '20px',
  fontWeight: fontWeights.medium,

  '@media': {
    [desktop]: {
      fontSize: '40px',
    },
  },
});

export const sectionTitleBrStyle = style({
  display: 'none',

  '@media': {
    [desktop]: {
      display: 'inline',
    },
  },
});

export const sectionDescriptionStyle = style({
  paddingTop: '4px',
  lineHeight: '1.25',
  fontSize: '12px',
  color: colorVars.sand11,

  '@media': {
    [desktop]: {
      minWidth: '400px',
      paddingTop: '8px',
      lineHeight: 'inherit',
      fontSize: '16px',
    },
  },
});

export const lineBreakStyle = style({
  display: 'block',
  content: '""',
  width: '100%',
});

export const mobileLinBreakStyle = style({
  display: 'block',
  content: '""',
  width: '100%',

  '@media': {
    [desktop]: {
      display: 'none',
    },
  },
});

export const videoStyle = style({
  width: '100%',
  height: 'auto',
  border: '1px solid',
  borderColor: colorVars.gold6,
  borderRadius: '12px',
  aspectRatio: '16 / 9',
  objectFit: 'cover',

  '@media': {
    [tablet]: {
      width: '60vw',
    },

    [desktop]: {
      width: '40vw',
      maxWidth: '680px',
    },
  },
});

export const extensionVideoStyle = style({
  '@media': {
    [desktop]: {
      width: '50vw',
      maxWidth: '55vw',
    },
  },
});

export const circleBaseStyle = style({
  position: 'absolute',
  borderRadius: '50%',
  opacity: 0.3,
  zIndex: 0,
});

export const textPointStyle = style({
  color: colorVars.primary,
});
