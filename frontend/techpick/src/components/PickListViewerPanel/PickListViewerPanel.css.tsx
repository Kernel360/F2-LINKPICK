import { style } from '@vanilla-extract/css';
import { colorThemeContract } from 'techpick-shared';

// const { color } = colorThemeContract;

export const globalLayout = style({
  backgroundColor: colorThemeContract.color.background,
});

export const headerLayout = style({});

export const mainLayout = style({});

export const footerLayout = style({});
