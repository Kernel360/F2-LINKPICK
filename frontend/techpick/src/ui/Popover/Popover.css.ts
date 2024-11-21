import { keyframes, style } from '@vanilla-extract/css';

const DURATION = '0.3s';
const MOVEMENT = '10px';
const SCALE_FACTOR = '1.5';

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});
const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});
const zoomIn = keyframes({
  '0%': { transform: `scale(1.0)` },
  '100%': { transform: `scale(${SCALE_FACTOR})` },
});
const zoomOut = keyframes({
  '0%': { transform: `scale(${SCALE_FACTOR})` },
  '100%': { transform: `scale(1.0)` },
});
const slideUp = keyframes({
  '0%': { transform: `translateY(${MOVEMENT})` },
  '100%': { transform: `translateY(0)` },
});
const slideDown = keyframes({
  '0%': { transform: `translateY(-${MOVEMENT})` },
  '100%': { transform: `translateY(0)` },
});
const slideRight = keyframes({
  '0%': { transform: `translateX(${MOVEMENT})` },
  '100%': { transform: `translateX(0)` },
});
const slideLeft = keyframes({
  '0%': { transform: `translateX(-${MOVEMENT})` },
  '100%': { transform: `translateX(0)` },
});

export const popoverStyle = style({
  zIndex: 10,
  borderRadius: '4px',
  border: '1px solid transparent',
  boxShadow:
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
  outline: 'none',
  selectors: {
    '&[data-state="open"]': {
      animation: `${zoomIn} ${fadeIn} ${DURATION}`,
    },
    '&[data-state="closed"]': {
      animation: `${zoomOut} ${fadeOut} ${DURATION}`,
    },
    '&[data-side="bottom"]': {
      animation: `${slideDown} ${DURATION}`,
    },
    '&[data-side="left"]': {
      animation: `${slideLeft} ${DURATION}`,
    },
    '&[data-side="right"]': {
      animation: `${slideRight} ${DURATION}`,
    },
    '&[data-side="top"]': {
      animation: `${slideUp} ${DURATION}`,
    },
  },
});
