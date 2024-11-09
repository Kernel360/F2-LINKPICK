import { keyframes, style } from '@vanilla-extract/css';
import { space, color } from 'techpick-shared';

export const linkStyle = style({
  color: 'inherit', // 부모의 텍스트 색상 따르기
  textDecoration: 'none', // 밑줄 제거
  selectors: {
    '&:hover': {
      color: 'inherit',
      textDecoration: 'none',
    },
    '&:active': {
      color: 'inherit',
      textDecoration: 'none',
    },
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
});

export const pickCardLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: space[8],
  width: '280px',
  height: '320px',
  border: `1px solid ${color.border}`,
  borderRadius: '4px',
  backgroundColor: color.background,
});

export const cardImageSectionStyle = style({
  width: '100%',
  height: '64px',
});

export const defaultCardImageSectionStyle = style({
  width: '100%',
  height: '64px',
  backgroundColor: '#f9f9f9',
});

export const cardImageStyle = style({
  objectFit: 'cover',
  borderRadius: '4px',
});

export const cardTitleSectionStyle = style({
  width: '264px',
  height: '96px',
  whiteSpace: 'normal',
  wordBreak: 'break-all',
  overflowY: 'scroll',
});

export const cardDescriptionSectionStyle = style({
  width: '264px',
  height: '64px',
  whiteSpace: 'normal',
  wordBreak: 'break-all',
  overflowY: 'scroll',
  fontSize: '14px',
});

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
