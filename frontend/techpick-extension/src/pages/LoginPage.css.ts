import { style } from '@vanilla-extract/css';
import { colorThemeContract, sizes, space } from 'techpick-shared';

export const loginPageLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: space['16'],
  alignItems: 'center',
  width: sizes['xs'],
  height: sizes['3xs'],
  padding: space['16'],
  backgroundImage: `linear-gradient(135deg, ${colorThemeContract.primary} 0%, ${colorThemeContract.secondary} 100%)`,
});
