import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const recommendedPickCarouselSectionStyle = style({
  padding: '4px 0',
});

export const recommendedPickCarouselStyle = style({
  flexShrink: 0,
});

export const recommendSectionDescription = style({
  fontSize: '16px',
});

export const pointTextStyle = style({
  color: colorVars.primary,
});

export const recommendSectionLayoutStyle = style({
  margin: 'auto',
  padding: '20px',
  width: 'fit-content',
});

export const recommendPageTitleStyle = style({
  display: 'inline-block',
  fontSize: '18px',
  fontWeight: '500',
});

export const recommendContentSectionStyle = style({
  height: 'calc(100vh - 92px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: 'fit-content',
});
