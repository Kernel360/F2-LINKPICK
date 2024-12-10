import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const recommendedPickCarouselSectionStyle = style({
  display: 'flex',
  gap: '32px',
  width: '1000px',

  '@media': {
    'screen and (min-width: 1920px)': {
      width: '1200px',
    },
  },
});

export const recommendedPickCarouselStyle = style({
  flexShrink: 0,
});

export const recommendSectionDescription = style({
  fontSize: '14px',
});

export const pointTextStyle = style({
  color: colorVars.primary,
});

export const recommendSectionLayoutStyle = style({
  margin: 'auto',
  padding: '32px',
  width: 'fit-content',
});

export const recommendPageTitleStyle = style({
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '500',
});

export const recommendContentSectionStyle = style({
  height: 'calc(100vh - 92px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: 'fit-content',
});
