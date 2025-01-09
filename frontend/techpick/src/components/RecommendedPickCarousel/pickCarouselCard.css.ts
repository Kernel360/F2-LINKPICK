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

export const imageStyle = style({
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
});

export const pickImageStyle = style([
  imageStyle,
  {
    objectFit: 'cover',
  },
]);

export const defaultImageStyle = style([
  pickImageStyle,
  {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
]);

export const pickTitleStyle = style({
  display: '-webkit-box',
  width: '100%',
  height: '40px',
  marginBottom: '12px',
  padding: '2px',
  overflow: 'hidden',
  fontSize: '12px',
  fontWeight: '500',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

export const defaultImageLayoutStyle = style([
  imageStyle,
  {
    width: '250px',
    height: '131px',
    position: 'relative',
    backgroundColor: colorVars.gold3,
  },
]);
