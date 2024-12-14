import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const recommendedPickCarouselLayoutStyle = style({
  position: 'relative',
});

export const recommendedPickCarouselStyle = style({
  position: 'relative',
  overflow: 'hidden',
  width: '1044px',

  '@media': {
    'screen and (min-width: 1920px)': {
      width: '1572px',
    },
  },
});

export const recommendedPickItemListStyle = style({
  display: 'flex',
  gap: '12px',
});

export const chevronIconStyle = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: colorVars.gold4,
  opacity: 0.5,
});

export const chevronLeftIconStyle = style([
  chevronIconStyle,
  { left: '-20px' },
]);

export const chevronRightIconStyle = style([
  chevronIconStyle,
  { right: '-20px' },
]);
