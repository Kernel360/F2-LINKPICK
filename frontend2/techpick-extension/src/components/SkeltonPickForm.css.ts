import { keyframes, style } from '@vanilla-extract/css';
import { SelectedTagCommonStyle } from './SelectedTagCommonStyle.css';

const shimmer = keyframes({
  '0%': {
    backgroundPosition: '100% 0',
  },
  '100%': {
    backgroundPosition: '0 0',
  },
});

export const skeleton = style({
  background: 'linear-gradient(270deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
  backgroundSize: '300% 100%',
  animation: `${shimmer} 1.5s infinite`,
  zIndex: '999',
});

export const skeletonImageStyle = style({
  flexShrink: '0',
  width: '48px',
  height: '48px',
});

export const skeletonTagInputStyle = style({
  width: SelectedTagCommonStyle.width,
  height: '40px',
  borderRadius: '4px',
});
