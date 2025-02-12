import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';

export const mobilePickRecordStyle = style({
  marginBottom: '8px',
  border: '1px solid',
  borderColor: colorVars.gold5,
  borderRadius: '8px',
  padding: '4px 4px 8px',
});

export const contentStyle = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '83.5px',
});

export const mainContentStyle = style({
  display: 'flex',
  gap: '12px',
});

export const imageSectionStyle = style({
  position: 'relative',
  width: '96px',
  height: '47.5px',
  aspectRatio: '1280 / 630',
  borderRadius: '2px',
});

export const backgroundImageStyle = style({
  flex: '0 0',
  width: '100%',
  height: '100%',
  opacity: '0.3',
  objectFit: 'cover',
});

export const imageStyle = style({
  position: 'absolute',
  top: '0',
  left: '0',
  flex: '0 0',
  width: '100%',
  height: '100%',
  objectFit: 'scale-down',
});

export const titleStyle = style({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  height: '44px',
  fontSize: '14px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
});

export const tagListStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  height: '36px',
  overflow: 'hidden',
});
