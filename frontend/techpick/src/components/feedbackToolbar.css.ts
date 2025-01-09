import { style, keyframes } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const feedbackToolbarStyle = style({
  position: 'absolute',
  bottom: '32px',
  right: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '8px 4px',
  border: '1px solid ',
  borderColor: colorVars.gold6,
  borderRadius: '8px',
  backgroundColor: colorVars.gold2,
  boxShadow: '1px 1px 5px rgb(0 0 0 / 15%)',
});

const slideUpAndFade = keyframes({
  from: { opacity: 0, transform: 'translateY(2px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  from: { opacity: 0, transform: 'translateX(-2px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  from: { opacity: 0, transform: 'translateY(-2px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  from: { opacity: 0, transform: 'translateX(2px)' },
  to: { opacity: 1, transform: 'translateX(0)' },
});

export const tooltipContent = style({
  borderRadius: '4px',
  padding: '10px 15px',
  backgroundColor: colorVars.gold4,
  fontSize: '15px',
  lineHeight: 1,
  color: colorVars.gold12,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  userSelect: 'none',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  selectors: {
    '&[data-state="delayed-open"][data-side="top"]': {
      animationName: slideDownAndFade,
    },
    '&[data-state="delayed-open"][data-side="right"]': {
      animationName: slideLeftAndFade,
    },
    '&[data-state="delayed-open"][data-side="bottom"]': {
      animationName: slideUpAndFade,
    },
    '&[data-state="delayed-open"][data-side="left"]': {
      animationName: slideRightAndFade,
    },
  },
});

export const tooltipArrow = style({
  fill: colorVars.gold4,
});

export const tooltipTriggerStyle = style({
  cursor: 'pointer',
});
