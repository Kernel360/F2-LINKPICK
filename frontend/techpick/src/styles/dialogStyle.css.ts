import { keyframes, style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

const contentShow = keyframes({
  from: {
    opacity: '0',
    transform: 'translate(-50%, -48%) scale(0.96)',
  },
  to: {
    opacity: '1',
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

export const dialogOverlayStyle = style({
  position: 'fixed',
  inset: '0',
  backgroundColor: colorVars.sand8,
  opacity: 0.5,
});

/**
 * @description width, height, padding 직접 설정해야합니다.
 * 또한 백그라운드도 직접 설정해야합니다.
 */
export const dialogContentLayoutStyle = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '8px',
  boxShadow: `
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px
  `,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const dialogContentBackgroundColorStyle = style({
  backgroundColor: colorVars.gold4,
});
