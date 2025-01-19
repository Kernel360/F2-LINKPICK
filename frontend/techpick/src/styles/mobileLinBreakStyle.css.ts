import { style } from '@vanilla-extract/css';
import { desktop, tablet } from 'techpick-shared';

/**
 * 모바일 화면일 때만 한 줄을 띄어줍니다.
 */
export const mobileLinBreakStyle = style({
  display: 'block',
  content: '""',
  width: '100%',

  '@media': {
    [`${tablet}, ${desktop}`]: {
      display: 'none',
    },
  },
});
