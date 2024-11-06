import { style } from '@vanilla-extract/css';
import { colorThemeContract } from 'techpick-shared';

export const rootLayout = style({
  width: '100%',
  height: '100vh',
});

export const viewWrapper = style({
  width: '100%',
  height: '100%',
  backgroundColor: colorThemeContract.color.background,
  color: colorThemeContract.color.font,
});

export const viewContainer = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  borderRadius: '8px',
});
