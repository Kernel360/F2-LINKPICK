import { keyframes, style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

const fadeInAnimation = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const fadeInStyle = style({
  animation: `${fadeInAnimation} 0.5s ease-in-out forwards`,
});

export const imageStyle = style({
  flexShrink: '0',
  width: '48px',
  height: '48px',
  padding: '2px',
  objectFit: 'cover',
  border: '1px solid',
  borderColor: colorVars.lightGray,
  opacity: 0,
  animation: `${fadeInAnimation} 0.5s ease-in-out forwards`,
});

export const imagePlaceholderStyle = style({
  flexShrink: '0',
  width: '48px',
  height: '48px',
  backgroundColor: '#f9f9f9',
});
