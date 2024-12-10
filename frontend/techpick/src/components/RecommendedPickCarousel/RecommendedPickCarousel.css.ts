import { style } from '@vanilla-extract/css';

export const recommendedPickCarouselLayoutStyle = style({
  overflow: 'hidden',
  position: 'relative',
  padding: '0 20px',
});

export const recommendedPickCarouselStyle = style({
  position: 'relative',
  overflow: 'hidden',
});

export const recommendedPickItemListStyle = style({
  display: 'flex',
  gap: '14px',
});

export const chevronIconStyle = style({
  position: 'absolute',
  top: '40%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
});

export const chevronLeftIconStyle = style([chevronIconStyle, { left: '0px' }]);

export const chevronRightIconStyle = style([
  chevronIconStyle,
  { right: '0px' },
]);
