import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

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
  width: '24px',
  height: '24px',

  ':hover': {
    outline: '1px solid',
    outlineColor: colorVars.slate5,
    boxShadow: `0 2px 8px ${colorVars.slate7}`,
  },
});

export const chevronLeftIconStyle = style([chevronIconStyle, { left: '4px' }]);

export const chevronRightIconStyle = style([
  chevronIconStyle,
  { right: '4px' },
]);
