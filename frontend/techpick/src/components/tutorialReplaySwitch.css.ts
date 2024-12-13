import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

// 스위치 루트 스타일
export const switchRoot = style({
  position: 'relative',
  flexShrink: '0',
  width: '42px',
  height: '25px',
  borderRadius: '9999px',
  border: 'none',
  boxShadow: `0 2px 10px ${colorVars.gold7}`,
  backgroundColor: colorVars.gold3,
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  cursor: 'pointer',

  ':focus': {
    boxShadow: `0 0 0 2px ${colorVars.gold8}`,
  },
  selectors: {
    '&[data-state="checked"]': {
      backgroundColor: colorVars.gold5,
    },
  },
});

// 스위치 썸 스타일
export const switchThumb = style({
  display: 'block',
  width: '21px',
  height: '21px',
  borderRadius: '9999px',
  boxShadow: `0 2px 2px ${colorVars.gold7}`,
  backgroundColor: colorVars.gold1,
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  selectors: {
    '&[data-state="checked"]': {
      transform: 'translateX(19px)',
    },
  },
});
