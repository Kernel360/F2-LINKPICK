import { style } from '@vanilla-extract/css';
import { colorThemeContract, sizes, space } from 'techpick-shared';

export const globalLayout = style({
  backgroundColor: colorThemeContract.color.background,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  padding: space['8'],

  '@media': {
    'screen and (min-width: 1440px)': {
      minWidth: sizes['3xs'],
    },
  },
});

export const headerLayout = style({});

export const mainLayout = style({});

export const footerLayout = style({});
