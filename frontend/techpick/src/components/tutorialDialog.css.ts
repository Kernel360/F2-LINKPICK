import {
  dialogContentBackgroundColorStyle,
  dialogContentLayoutStyle,
} from '@/styles/dialogStyle.css';
import {
  orangeOutlineButtonStyle,
  orangeSolidButtonStyle,
} from '@/styles/orangeButtonStyle.css';
import { style } from '@vanilla-extract/css';
import { colorVars, desktop, mobile, tablet } from 'techpick-shared';

export const dialogContent = style([
  dialogContentLayoutStyle,
  dialogContentBackgroundColorStyle,
  {
    width: '100%',
    height: 'fit-content',
    padding: '12px',

    '@media': {
      [desktop]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 'fit-content',
        minHeight: 'fit-content',
        height: 'auto',
        padding: '24px',
      },
    },
  },
]);

export const tabContentDescriptionStyle = style({
  width: 'fit-content',
  fontSize: '18px',

  '@media': {
    [desktop]: {
      height: '32px',
      textDecoration: 'underline',
      textDecorationColor: colorVars.primary,
      textUnderlineOffset: '4px',
    },
  },
});

export const pointTextStyle = style({ color: colorVars.primary });

export const mobileTextUnderlineStyle = style({
  '@media': {
    [mobile]: {
      textDecoration: 'underline',
      textDecorationColor: colorVars.primary,
      textUnderlineOffset: '4px',
    },
  },
});

export const tabRootStyle = style({
  position: 'relative',

  '@media': {
    [mobile]: {
      width: '100%',
    },
  },
});

export const tabContentStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  '@media': {
    [desktop]: {
      gap: '12px',
    },
  },
});

export const tabTriggerLayoutStyle = style({
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: '8px',
  '@media': { [desktop]: { flexDirection: 'row' } },
});

export const videoStyle = style({
  width: '659px',
  borderRadius: '4px',
  aspectRatio: '16 / 9',
  objectFit: 'cover',

  '@media': {
    [`${mobile},${tablet}`]: {
      width: '100%',
    },
    [desktop]: {},
  },
});

export const tabListStyle = style({
  '@media': {
    [mobile]: {
      marginTop: '8px',
    },
    [tablet]: {
      marginTop: '16px',
    },
    [desktop]: {
      position: 'absolute',
      top: '0',
      right: '0px',
    },
  },
});

export const tutorialButtonStyle = style({
  width: '100%',
  height: '40px',

  '@media': {
    [desktop]: {
      width: '56px',
      height: '32px',
    },
  },
});

export const outlineButtonStyle = style([
  orangeOutlineButtonStyle,
  tutorialButtonStyle,
]);

export const solidButtonStyle = style([
  orangeSolidButtonStyle,
  tutorialButtonStyle,
]);
