import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const pickCarouselItemStyle = style({
  flexGrow: '0',
  flexShrink: '0',
  minWidth: 0,
  width: '252px',
  borderRadius: '8px',
  border: `1px solid ${colorVars.slate6}`,
  backgroundColor: colorVars.slate1,
  transition: 'all 0.3s ease',
  cursor: 'pointer',

  ':hover': {
    boxShadow: `2px 3px 6px ${colorVars.slate5}`,
  },
});

export const pickImageStyle = style({
  objectFit: 'cover',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
});

export const pickTitleStyle = style({
  display: '-webkit-box',
  width: '100%',
  height: '44px',
  padding: '2px',
  overflow: 'hidden',
  fontSize: '12px',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});
